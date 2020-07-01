const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
  is_active: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  dri_status: {
    type: Boolean,
    default: true,
  },
  is_working: {
    type: Boolean,
    default: false,
  },
  user_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },

  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("driver", DriverSchema, "driver");
