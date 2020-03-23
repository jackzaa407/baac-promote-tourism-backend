require("dotenv").config();
const axiosInstance = require("./axiosReject");
const jwt = require("../utils/genJwtToExternalAPI")
const axios = require('axios')
const MESSAGE = require('../utils/message.json')

const notiSend = async phone => {
  const result_notiSend = await axiosInstance.post(
    process.env.EXTERNAL_URL + MESSAGE.EXTERNAL_API_PATH.NOTISEND_API,
    {
      noti_id: "0123456789",
      channel: "sms",
      message: "ทดสอบข้อความ",
      request_timestamp: "2020-03-09T10:28:30.511Z"
    },
    {
      headers: {
        apikey: "tAu08J9Aplzkq2W87C0JqnAJ7J39hx55",
        "content-type": "application/json",
        "Authorization" : "bearer " + jwt()
      }
    }
  );
  return result_notiSend.data;
};

module.exports = notiSend;
