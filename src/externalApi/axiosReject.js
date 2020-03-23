const https = require("https")
const axios = require("axios")

const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  })

  module.exports = instance