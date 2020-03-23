const mongoose = require("mongoose");
const cors = require("cors");
const routerMock = require("../routes/routeMock");
const routerRegister = require("../routes/register");
const routerCheck = require("../routes/checkregister");
const routerCancelDebitHolder = require("../routes/cancelDebitHolder");
const routerAuth = require('../routes/auth')
const passport = require("passport");
const HeaderAPIKeyStrategy = require("passport-headerapikey").HeaderAPIKeyStrategy;
const bcrypt = require('bcrypt');

const express = require("express");
require("dotenv").config();
const app = express();

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

const startdb = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    });
    app.use(
      cors()
    );
    app.use(express.json());
    app.use(routerMock);
    app.use(routerRegister);
    app.use(routerCheck);
    app.use(routerCancelDebitHolder);
    app.use(routerAuth)
    app.use(
      passport.initialize(
        passport.use(
          new HeaderAPIKeyStrategy(
            { header: "apikey", prefix: "" },
            false,
            function(apikey, done) {
              if (!bcrypt.compareSync(process.env.SECRETKEY, apikey) ){
                return done(null, false);
              }
              return done(null, true);
            }
          )
        )
      )
    );
  } catch (error) {
    console.log("Could not connect to the database. Exiting now...", error);
    process.exit();
  }
};

module.exports = { app, startdb };
