const validator = require("validator");
const MESSAGE = require('../utils/message.json')
const decrypt = require('../utils/decrypt')

const validatiorReq = (req, res, next) => {
  let { citizenId, phone, refCode } = req.body;
  let cid_plaintext = decrypt(citizenId)
  let phone_plaintext = decrypt(phone)

  let isCitizenId = validator.matches(cid_plaintext, /^[1-9]\d{12}$/);

  let isPhone = validator.matches(phone_plaintext, /^0[6,8,9]\d{8}$/);

  let isRefCode = validator.matches(refCode, /^\d{7}$/);

  req.body.cid_plaintext = cid_plaintext

  isCitizenId && isPhone && isRefCode === true
    ? next()
    : res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({ msg: MESSAGE.RETURN_MESSAGE.INPUT_INVALID });
};

module.exports = validatiorReq