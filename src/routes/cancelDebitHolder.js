const express = require("express");
const DebitHolder = require("../models/debitHolder");
const router = new express.Router();
const checkRefCode = require("../middleware/checkRefCode");
const consent = require("../externalApi/logConsentApi");
const logger = require('../utils/logger');
const validatiorReq = require('../middleware/validatiorReq')
const authentication = require('../middleware/authentication')
const decrypt = require('../utils/decrypt')
const MESSAGE = require('../utils/message.json')

router.post("/unregister", authentication, validatiorReq,checkRefCode,  async (req, res) => {
  try {
    let holders = await DebitHolder.find({});
    
    const holder = holders.find(holder => req.body.cid_plaintext === decrypt(holder.citizenId))
    if (!holder) {
      res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({ msg: MESSAGE.RETURN_MESSAGE.CHECK_REGIS_FAIL });
    } else {
      
      if (holder.status === MESSAGE.RETURN_MESSAGE.CID_ACTIVE) {
        await DebitHolder.updateOne(
          { _id: holder._id },
          { $set: { status: MESSAGE.RETURN_MESSAGE.CID_INACTIVE } }
        );
        res.status(MESSAGE.STATUS_CODE.OK).send({ msg: MESSAGE.RETURN_MESSAGE.UNREGIS_MESSAGE });
        consent()
        logger.info(MESSAGE.SERVICE_NAME + " " + req.method + " " + JSON.stringify(MESSAGE.LOG_UNREGISTER_SUCCESS));
      } else {
        res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({ msg: MESSAGE.RETURN_MESSAGE.ALREADY_MESSAGE });
      }
    }
  } catch (error) {
    res.status(MESSAGE.STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = router;
