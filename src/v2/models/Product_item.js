const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    order_status_id: {
      type: Schema.Types.ObjectId,
      ref: "order_status",
      // required: true,
    },
    items: [
      {
        seller_id: {
          type: Schema.Types.ObjectId,
          ref: "seller",
          // required: true,
        },
        order_status_id: {
          type: Schema.Types.ObjectId,
          ref: "order_status",
          // required: true,
        },
        distance: {
          type: Number,
        },
        total_delivery: {
          type: Number,
        },
        // total_price: {
        //   type: Number,
        //   required: true,
        // },
        option: [
          {
            option_title: [],
            option_detail: [],
            product_seller_id: {
              type: Schema.Types.ObjectId,
              ref: "product_seller",
            },
            order_status_id: {
              type: Schema.Types.ObjectId,
              ref: "order_status",
              default: null,
            },
            option_id: {
              type: Schema.Types.ObjectId,
              ref: "products_option",
            },
            pd_name: {
              type: String,
            },
            pd_brand: {
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
            pd_discount: {
              type: Schema.Types.ObjectId,
              ref: "flash_deal",
              default: null,
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
      default: Date.now,
    },
  },
  {
    collection: "product_item",
  }
);

module.exports = mongoose.model("product_item", Product_items, "product_item");
