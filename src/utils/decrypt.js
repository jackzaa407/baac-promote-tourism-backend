const NodeRSA = require('node-rsa')
const fs = require('fs')

const decrypt = (digest) => {
  const privateKeyfromfile = fs.readFileSync(".encryptecid/priv", "utf8");

  const privatekey = new NodeRSA(privateKeyfromfile, "pkcs1-private-pem");

  const options = {
    environment: "browser",
    encryptionScheme: {
      scheme: "pkcs1_oaep",
      hash: "sha256"
    }
  };
  privatekey.setOptions(options);

  return privatekey.decrypt(Buffer.from(digest, 'hex').toString('base64'), 'utf-8')

};

module.exports= decrypt