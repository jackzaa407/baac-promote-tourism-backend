require("dotenv").config();
const axiosInstance = require("./axiosReject")
const jwt = require("../utils/genJwtToExternalAPI")
const MESSAGE = require('../utils/message.json')


const checkCardType = async cid => {
  const result_checkcardtype = await axiosInstance.post(
    process.env.EXTERNAL_URL + MESSAGE.EXTERNAL_API_PATH.CHECKCARD_API,
    {
      cid:
        "82286a9aa2516e0ca334456505bcfb7cdaa2bc4240e35cf0765555ca6110db0f4f7f47ca231bf68de42422e676c89b7c06c60f749b76f30e6aa18510f403fbae25f47d54bf08b6012494f0a7c71ebfc34556499feae8ba6370c58c28d1a9c0aee54dd6176820cde867e803e739c8937d2981a6a9a22ea7e2bccc3b2b9869fb934b33c5e2ce8441345f2db03700c8190dd13b34cc3ff91e99dcefb1ca0bf94dac8a333504816e9dfb033440e442571928f68a158dd636fc117a14994fc0146034d8652bbf70ae17c74424865821aaaa1cd2dbd8c966a469b52e9bcdf347de399fcc23a9f69c8922606ab7d6f22eb727fc6bc0b826af77cfd15f70e70ef8ec7bed"
    },
    {
      headers: {
        apikey: "tAu08J9Aplzkq2W87C0JqnAJ7J39hx55",
        "content-type": "application/json",
        "Authorization" : "bearer " + jwt()
      }
    }
  );
  return result_checkcardtype.data;
};

module.exports = checkCardType;
