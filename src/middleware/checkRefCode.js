const refCodeApi = require("../externalApi/refCodeApi");
const MESSAGE = require('../utils/message.json')

const checkRefCode = async (req, res, next) => {
  try {
    let { citizenId, phone, refCode } = req.body;

    const result_checkref = await refCodeApi(citizenId, phone, refCode);
    if (result_checkref.responseMessage === MESSAGE.RETURN_MESSAGE.API_RES_MSG_NO)
      res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({ msg: MESSAGE.RETURN_MESSAGE.INVALID_REFCODE });

    next();
  } catch (error) {
    res.status(MESSAGE.STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = checkRefCode
