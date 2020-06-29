var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Condition = new Schema({
  title: {
    type: String,
    required: true,
  },
  condition: [],
  used: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: Date.now(),
  },
  is_active: {
    type: String,
    required: true,
    default: "active",
  },
});

module.exports = mongoose.model("condition", Condition, "condition");
