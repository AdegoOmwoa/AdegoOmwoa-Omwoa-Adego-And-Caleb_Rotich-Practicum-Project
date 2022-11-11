const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: Number,
  },
  checkOut: {
    required: true,
    type: Date,
    default: Date.now,
  },
  adults: {
    required: true,
    type: Number,
  },
  children: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Asset", assetSchema);
