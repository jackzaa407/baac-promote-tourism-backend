const express = require("express");
const DebitHolder = require("../models/debitHolder");
const router = new express.Router();
const checkRefCode = require("../middleware/checkRefCode");
const validatiorReq = require('../middleware/validatiorReq')
const checkCardType = require("../middleware/checkCardType");
const authentication = require('../middleware/authentication')
const decrypt = require('../utils/decrypt')
const MESSAGE = require('../utils/message.json')

router.post("/check", authentication, validatiorReq,checkRefCode,checkCardType, async (req, res) => {
  try {    
    let holders = await DebitHolder.find({});

    const holder = holders.find(holder => req.body.cid_plaintext  === decrypt(holder.citizenId))
    if (!holder) res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({ msg: MESSAGE.RETURN_MESSAGE.CHECK_REGIS_FAIL });

    res.send({ status: holder.status });
  } catch (error) {
    res.status(MESSAGE.STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = router
