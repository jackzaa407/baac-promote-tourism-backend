const NodeRSA = require("node-rsa");
const fs = require("fs");

const encrypt =  (plaintxt) => {
  try {
    const publicKeyfromfile = fs.readFileSync(".encryptecid/pub", "utf8");
    const publickey = new NodeRSA(publicKeyfromfile, "pkcs8-public-pem");

    const options = {
      environment: "browser", 
      encryptionScheme: {
        scheme: "pkcs1_oaep", 
        hash: "sha256" 
      }
    };
    publickey.setOptions(options);

    const digest = publickey.encrypt(plaintxt, "hex");

    return digest

  } catch (error) {
    console.log(error)
  }
};

module.exports = encrypt;
