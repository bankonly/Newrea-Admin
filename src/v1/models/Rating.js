var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var rating = new Schema({
  product_seller_id: {
    type: Schema.Types.ObjectId,
    ref: "product_seller",
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
  cus_id: {
    type: Schema.Types.ObjectId,
    ref: "customer",
  },
  comment: {
    type: String,
  },
  star: {
    type: Number,
    required: true,
  },
  is_active: {
    type: String,
    default: "active",
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("rating", rating, "rating");
