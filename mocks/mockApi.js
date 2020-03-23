const nock = require("nock");
require("dotenv").config();

const mockCheckRefCode = () => {
  nock(process.env.EXTERNAL_URL)
    .persist()
    .post("/checkownmobile", {
      cid:
        "82286a9aa2516e0ca334456505bcfb7cdaa2bc4240e35cf0765555ca6110db0f4f7f47ca231bf68de42422e676c89b7c06c60f749b76f30e6aa18510f403fbae25f47d54bf08b6012494f0a7c71ebfc34556499feae8ba6370c58c28d1a9c0aee54dd6176820cde867e803e739c8937d2981a6a9a22ea7e2bccc3b2b9869fb934b33c5e2ce8441345f2db03700c8190dd13b34cc3ff91e99dcefb1ca0bf94dac8a333504816e9dfb033440e442571928f68a158dd636fc117a14994fc0146034d8652bbf70ae17c74424865821aaaa1cd2dbd8c966a469b52e9bcdf347de399fcc23a9f69c8922606ab7d6f22eb727fc6bc0b826af77cfd15f70e70ef8ec7bed",
      mobileNumber: "0991234326",
      requestDate: "20200225",
      refCode: "1234567"
    })
    .reply(200, {
      responseData: {
        code: "0000",
        message: "success"
      },
      responseMessage: "own mobile match sucess",
      responseStatus: "pass",
      responseTimestamp: "2020-03-09T10:28:30.511Z"
    });
};

const mockCheckCardType = () => {
  nock(process.env.EXTERNAL_URL)
    .persist()
    .post("/checkcardtype", {
      cid:
        "82286a9aa2516e0ca334456505bcfb7cdaa2bc4240e35cf0765555ca6110db0f4f7f47ca231bf68de42422e676c89b7c06c60f749b76f30e6aa18510f403fbae25f47d54bf08b6012494f0a7c71ebfc34556499feae8ba6370c58c28d1a9c0aee54dd6176820cde867e803e739c8937d2981a6a9a22ea7e2bccc3b2b9869fb934b33c5e2ce8441345f2db03700c8190dd13b34cc3ff91e99dcefb1ca0bf94dac8a333504816e9dfb033440e442571928f68a158dd636fc117a14994fc0146034d8652bbf70ae17c74424865821aaaa1cd2dbd8c966a469b52e9bcdf347de399fcc23a9f69c8922606ab7d6f22eb727fc6bc0b826af77cfd15f70e70ef8ec7bed"
    })
    .reply(200, {
      responseData: {
        cardTypeStatus: "yes",
        customerName: "นาย ธรรมะ ธัมโม"
      },
      responseMessgae: "check cardtype success",
      responseStatus: "pass",
      responseTimeStamp: "2020-03-09T10:28:30.511Z"
    });
};
const mockConsent = () => {
  nock(process.env.EXTERNAL_URL)
    .persist()
    .post("/consent", {
      reqRefNo: "sysA0000",
      channel: "MBP",
      branch: "0001",
      userId: "6200011",
      pidType: "citizentId",
      pidNo:
        "82286a9aa2516e0ca334456505bcfb7cdaa2bc4240e35cf0765555ca6110db0f4f7f47ca231bf68de42422e676c89b7c06c60f749b76f30e6aa18510f403fbae25f47d54bf08b6012494f0a7c71ebfc34556499feae8ba6370c58c28d1a9c0aee54dd6176820cde867e803e739c8937d2981a6a9a22ea7e2bccc3b2b9869fb934b33c5e2ce8441345f2db03700c8190dd13b34cc3ff91e99dcefb1ca0bf94dac8a333504816e9dfb033440e442571928f68a158dd636fc117a14994fc0146034d8652bbf70ae17c74424865821aaaa1cd2dbd8c966a469b52e9bcdf347de399fcc23a9f69c8922606ab7d6f22eb727fc6bc0b826af77cfd15f70e70ef8ec7bed",
      customerNo: "",
      consentVersion: "1.0",
      consentDescription: "this text is description from request",
      consentRequestdate: "2020-03-12",
      consentEffectivedate: "2020-03-12",
      consentExpiredate: "2020-03-12"
    })
    .reply(200, {
      responseData: {
        branch: "0001",
        channel: "MBP",
        consentDescription: "this text is description from request",
        consentEffectivedate: "2020-03-12",
        consentExpiredate: "2020-03-12",
        consentRequestdate: "2020-03-12",
        consentVersion: "1.0",
        customerNo: "",
        pidNo:
          "82286a9aa2516e0ca334456505bcfb7cdaa2bc4240e35cf0765555ca6110db0f4f7f47ca231bf68de42422e676c89b7c06c60f749b76f30e6aa18510f403fbae25f47d54bf08b6012494f0a7c71ebfc34556499feae8ba6370c58c28d1a9c0aee54dd6176820cde867e803e739c8937d2981a6a9a22ea7e2bccc3b2b9869fb934b33c5e2ce8441345f2db03700c8190dd13b34cc3ff91e99dcefb1ca0bf94dac8a333504816e9dfb033440e442571928f68a158dd636fc117a14994fc0146034d8652bbf70ae17c74424865821aaaa1cd2dbd8c966a469b52e9bcdf347de399fcc23a9f69c8922606ab7d6f22eb727fc6bc0b826af77cfd15f70e70ef8ec7bed",
        pidType: "citizentId",
        registrationId: "39685617-52e0-40e7-9d3d-1ac6d979c485",
        reqRefNo: "sysA0000",
        responseCode: "0000",
        responseDesc: "this text is discription for response",
        timestamp: "2020-03-09T10:28:30.511Z",
        userId: "6200011"
      },
      responseMessage: "add success",
      responseStatus: "pass"
    });
};

const mockNotiSend = () => {
  nock(process.env.EXTERNAL_URL)
    .persist()
    .post("/noti/send", {
      noti_id: "0123456789",
      channel: "sms",
      message: "ทดสอบข้อความ",
      request_timestamp: "2020-03-09T10:28:30.511Z"
    })
    .reply(200, {
      response_data: {
        message_id: "938fdcd7-5e6a-4f07-9ddd-f0df57d48368"
      },
      response_message: "message received.",
      response_status: "pass",
      response_timestamp: "2020-03-13T03:56:38.721Z"
    });
};

module.exports = {
  mockCheckCardType,
  mockCheckRefCode,
  mockConsent,
  mockNotiSend
};
