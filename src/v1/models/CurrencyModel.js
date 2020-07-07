var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CurrencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
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

module.exports = mongoose.model("currency", CurrencySchema, "currency");
