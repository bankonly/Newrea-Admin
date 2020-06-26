var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var pd_most_popular = new Schema({
  product_seller_id: {
    type: Schema.Types.ObjectId,
    ref: "product_seller",
  },
  most_popular_id: {
    type: Schema.Types.ObjectId,
    ref: "most_popular",
  },
  number: {
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

module.exports = mongoose.model(
  "product_most_popular",
  pd_most_popular,
  "product_most_popular"
);
