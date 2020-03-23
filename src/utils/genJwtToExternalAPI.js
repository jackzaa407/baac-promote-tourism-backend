const moment = require("moment");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const genJwtToExternalAPI = () => {
  var privateKey = fs.readFileSync(".JWT/externalAPI/private", "utf8");

  var durationMin = 9;
  var expireTime = Math.floor(moment() / 1000) + 60 * durationMin;

  var payload = {
    iss: "vdptOMKgZTTlBSpZO9JUAPTZ3TW2rRvs",
    exp: expireTime
  };

  var signOptions = {
    algorithm: "RS256"
  };

  var token = jwt.sign(payload, privateKey, signOptions);

  return token;
};

module.exports = genJwtToExternalAPI;
