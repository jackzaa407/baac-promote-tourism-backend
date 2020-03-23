const moment = require("moment");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const genJwtToFrontend = () => {
  var privateKey = fs.readFileSync(".JWT/frontend/private-front.pem", "utf8");

  var durationMin = 9;
  var expireTime = Math.floor(moment() / 1000) + 60 * durationMin;

  var payload = {
    iss: "baac_promote_tourism",
    exp: expireTime
  };

  var signOptions = {
    algorithm: "RS256"
  };

  var token = jwt.sign(payload, privateKey, signOptions);

  return token;
};

module.exports = genJwtToFrontend;
