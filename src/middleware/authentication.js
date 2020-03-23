const jwt = require("jsonwebtoken");
const fs = require('fs')
const authentication = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const cert = fs.readFileSync(".JWT/frontend/public-front.pem");
    jwt.verify(token, cert, { algorithms: ["RS256"] });
    next();
  } catch (error) {
    res.status(401).send('No credentials!');
  }
};

module.exports = authentication
