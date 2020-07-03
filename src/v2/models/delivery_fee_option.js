const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Delivery_fee_option_Schema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  percen: {
    type: Number,
    required: true,
    default: 0,
  },
  is_active: {
    type: String,
    required: true,
    default: "active",
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "delivery_fee_option",
  Delivery_fee_option_Schema,
  "delivery_fee_option"
);
