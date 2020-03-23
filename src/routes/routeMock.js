const express = require("express");
const DebitHolder = require("../models/debitHolder");
const UserMock = require("../models/userMock");
const validatiorReq = require('../middleware/validatiorReq')
const router = new express.Router();
const crypto = require("crypto");
const moment = require("moment-timezone");
moment.suppressDeprecationWarnings = true;
const { checkCardType, checkref, consent } = require("../externalApi/refCodeApi");

router.post("/register/mock", validatiorReq, async (req, res) => {
  try {
    let { citizenId, phone, refCode } = req.body;
    const user = await UserMock.findOne({ citizenId });
    console.log("refCode req", refCode);
    console.log("refCode user", user.refCode);
    if (refCode !== user.refCode) {
      console.log("refCode fail!");
      return res.status(200).send({ result: "fail", msg: "รหัสอ้างอิงไม่ถูกต้อง" });
    }
    if (user.cardActive === "no") {
      console.log("cardActive fail!");
      return res.status(200).send({ result: "fail", msg: "บัตรเดบิตไม่ตรงตามเงื่อนไขที่ธนาคารกำหนด" });
    }

    if (user.status === "active") {
      console.log("status active!");
      return res.status(200).send({ result: "fail", msg: "ท่านได้ทำการลงเบียนแล้ว ไม่สามารถลงทะเบียนซ้ำได้" });
    }
    return res.status(200).send({ result: "success"});
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/reports", async (req, res) => {
  try {
    let lists = await DebitHolder.find({ status: "active" });

    lists.map(item => {
      item.datetimeSubmit = moment
        .utc(item.datetimeSubmit.toString())
        .local()
        .format();
    });

    res.send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
