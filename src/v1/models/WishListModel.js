var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var WishListSchema = new Schema({
  cus_id: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  pd_id: {
    type: Schema.Types.ObjectId,
    ref: "product_seller",
    required: true,
  },
  is_active: {
    type: String,
    required: true,
    default: "active",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("wish_list", WishListSchema, "wish_list");
