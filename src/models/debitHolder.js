const mongoose = require("mongoose");
const moment = require("moment-timezone");

const DebitHolderSchema = new mongoose.Schema(
  {
    phone: {
      type: String
    },
    datetimeSubmit: {
      type: Date,
      default: moment()
        .tz("Asia/Bangkok")
        .format()
    },
    citizenId: {
      type: mongoose.Schema.Types.String,
      unique: true
    },
    status: {
      type: String,
      default: "active"
    }
  },
  { timestamps: { updatedAt: "updated_at" } }
);

module.exports = mongoose.model(
  "DebitHolder",
  DebitHolderSchema,
  "debitHolders"
);
