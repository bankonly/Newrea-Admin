const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  category_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  user_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  is_active: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  img: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  location: [
    {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
  ],
  address: {
    type: String,
  },
  delivery_fee_option_id: {
    type: Schema.Types.ObjectId,
    ref: "delivery_fee_option",
  },
  com: {
    type: Number,
    required: true,
    default: 0,
  },
  is_online: {
    type: String,
    default: "close",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("seller", SellerSchema, "seller");
