const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tracking_order = new Schema({
  product_item_id: {
    type: Schema.Types.ObjectId,
    ref: "product_item",
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
  tracking_status: [
    {
      update_by: {
        type: String,
        enum: ["user", "driver", "seller", "admin"],
      },
      order_status: {
        type: Schema.Types.ObjectId,
        ref: "order_status",
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model(
  "tracking_order",
  Tracking_order,
  "tracking_order"
);
