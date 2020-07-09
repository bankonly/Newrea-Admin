import { Schema, model } from "mongoose";
const order_history = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order"
    },
    status_id: {
      type: Schema.Types.ObjectId,
      ref: "order_status"
    },
    product_item_id: {
      type: Schema.Types.ObjectId,
      ref: "product_item"
    },
    updated_by: {
      type: String,
      required: true
    },
    updated_by_customer_id: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      default: null
    },
    updated_by_seller_id: {
      type: Schema.Types.ObjectId,
      ref: "seller",
      default: null
    },
    updated_by_admin_id: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      default: null
    },
    updated_by_driver_id: {
      type: Schema.Types.ObjectId,
      ref: "driver",
      default: null
    },
    cancel_reason_id: {
      type: String
    },
    is_active: {
      type: String,
      default: "active"
    },
    created_date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "order_history"
  }
);

const order_historys = model("order_history", order_history);

export default order_historys;
