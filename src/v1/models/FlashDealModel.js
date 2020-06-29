var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FlashDealSchema = new Schema({
  product_seller_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "product_seller",
    },
  ],
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
    // required: Date.now()
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

module.exports = mongoose.model("flash_deal", FlashDealSchema, "flash_deal");
