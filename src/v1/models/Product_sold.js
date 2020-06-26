var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var product_sold = new Schema({
  product_seller_id: {
    type: Schema.Types.ObjectId,
    ref: "product_seller",
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

module.exports = mongoose.model("product_sold", product_sold, "product_sold");
