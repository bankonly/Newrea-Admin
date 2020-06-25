const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
  },
  is_active: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("brand", brandSchema, "brand");
