import { Schema, model } from "mongoose";

const Product_items = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order",
      default: null,
    },
    cus_id: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    pd_item_status: {
      type: Schema.Types.ObjectId,
      ref: "order_status",
      required: true,
    },
    items: [
      {
        seller_id: {
          type: Schema.Types.ObjectId,
          ref: "seller",
          required: true,
        },
        order_status_id: {
          type: Schema.Types.ObjectId,
          ref: "order_status",
          required: true,
        },
        distance: {
          type: Number,
        },
        total_delivery: {
          type: Number,
        },
        total_price: {
          type: Number,
          required: true,
        },
        option: [
          {
            product_seller_id: {
              type: Schema.Types.ObjectId,
              ref: "product_seller",
            },
            pd_name: {
              type: String,
            },
            pd_bran: {
              type: String,
            },
            color: {
              type: String,
            },
            size: {
              type: String,
            },
            price: {
              type: Number,
            },
            qty: {
              type: Number,
            },
            pd_img: {
              type: String,
            },
            delivery_date: {
              type: String,
            },
          },
        ],
      },
    ],
    is_active: {
      type: String,
      default: "active",
    },
    created_date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "product_item",
  }
);

const Product_item = model("product_item", Product_items);
export default Product_item;
