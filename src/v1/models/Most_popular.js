var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Most_popular = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: null,
  },
  img: {
    type: String,
    required: true,
  },
  is_active: {
    type: String,
    default: "active",
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("most_popular", Most_popular, "most_popular");
