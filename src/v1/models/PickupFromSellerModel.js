const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickupFromSellerSchema = new Schema(
  {
    product_item_id: {
      type: Schema.Types.ObjectId,
      ref: "product_item",
      required: true,
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      ref: "driver",
      required: true,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    order_status_id: {
      type: Schema.Types.ObjectId,
      ref: "order_status",
      required: true,
    },
    cancel_reason_id: {
      type: Schema.Types.ObjectId,
      ref: "cancel_reason",
      default: null,
    },
    is_active: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model(
  "PickupFromSeller",
  PickupFromSellerSchema,
  "pickup_from_seller"
);
