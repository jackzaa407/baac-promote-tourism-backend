const { createLogger, format, transports } = require("winston");
const moment = require('moment-timezone')
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let logDir;
process.env.Env === "development" ? (logDir = "devlog") : (logDir = "log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, "promote_tourism_info.log");
const logger = createLogger({
  // change level if in dev environment versus production
  level: "info",
  format: format.combine(
    format.timestamp({
      format: moment()
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD HH:mm:ss")
    }),
    format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: process.env.ENV === "development" ? "debug" : "info",
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
      )
    }),
    new transports.File({ filename })
  ]
});

module.exports = logger;
