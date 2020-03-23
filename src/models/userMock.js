const mongoose = require("mongoose");
const moment = require("moment-timezone");

const UserMockSchema = new mongoose.Schema({
  refCode: String,
  cardActive: String,
  phone: String,
  citizenId: {
    type: mongoose.Schema.Types.String,
    unique: true
  },
  status: String
});

module.exports = mongoose.model("UserMock", UserMockSchema, "UserMock");
