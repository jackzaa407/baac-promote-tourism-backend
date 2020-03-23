const checkCardTypeApi = require("../externalApi/checkCardApi");
const MESSAGE = require('../utils/message.json')

const checkCardType = async (req, res, next) => {
  try {
    let { citizenId } = req.body;

    const result_checkcardtype = await checkCardTypeApi(citizenId);

    if (result_checkcardtype.responseMessage === MESSAGE.RETURN_MESSAGE.API_RES_MSG_NO) {
      res.status(MESSAGE.STATUS_CODE.BAD_REQUEST).send({
        msg: MESSAGE.RETURN_MESSAGE.INVALID_CARDTYPE
      });
    }

    next();
  } catch (error) {
    res.status(MESSAGE.STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = checkCardType