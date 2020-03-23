const express = require("express");
const DebitHolder = require("../models/debitHolder");
const checkRefCode = require("../middleware/checkRefCode");
const checkCardType = require("../middleware/checkCardType");
const consent = require("../externalApi/logConsentApi");
const logger = require('../utils/logger');
const validatiorReq = require('../middleware/validatiorReq')
const notisend = require('../externalApi/notiSendApi')
const authentication =require('../middleware/authentication')
const router = new express.Router();
const decrypt = require('../utils/decrypt')
const MESSAGE = require('../utils/message.json')

router.post("/register", authentication ,validatiorReq,checkRefCode,checkCardType, async (req, res) => {
  try {
    
    let { citizenId, phone } = req.body;

    let holders = await DebitHolder.find({});
    
    const holder = holders.find(holder => req.body.cid_plaintext  === decrypt(holder.citizenId))

    if (!holder) {
      let newRegister = new DebitHolder({
        citizenId: citizenId,
        phone: phone
      });
      await newRegister.save();
      notisend()
      res.status(MESSAGE.STATUS_CODE.CREATED).send({ result: MESSAGE.RETURN_MESSAGE.REGIS_MESSAGE });
      consent()
      logger.info(MESSAGE.SERVICE_NAME + " " + req.method + " " + JSON.stringify(MESSAGE.LOG_REGISTER_SUCCESS));
    } else {
      if (holder.status === MESSAGE.RETURN_MESSAGE.CID_ACTIVE) {
        res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({
          msg: MESSAGE.RETURN_MESSAGE.REGIS_FAIL_MESSAGE
        });
      } else {
        await DebitHolder.updateOne(
          { _id: holder._id },
          { $set: { status: MESSAGE.RETURN_MESSAGE.CID_ACTIVE } }
        );
        notisend()
        res.status(MESSAGE.STATUS_CODE.CREATED).send({ result: MESSAGE.RETURN_MESSAGE.REGIS_MESSAGE });
        consent()
        logger.info(MESSAGE.SERVICE_NAME + " " + req.method + " " + JSON.stringify(MESSAGE.LOG_REGISTER_SUCCESS));

      }
    }
  } catch (error) {
    res.status(MESSAGE.STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = router;
