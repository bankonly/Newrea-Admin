import { Schema, model } from "mongoose";

const Product_items = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order"
    },
    items: [
      {
        seller_id: {
          type: Schema.Types.ObjectId,
          ref: "seller"
        },
        order_status_id: {
          type: Schema.Types.ObjectId,
          ref: "order_status"
        },
        distance: {
          type: Number,
          required: true
        },
        total_delivery: {
          type: Number,
          required: true
        },
        total_price: {
          type: Number,
          required: true
        },
        option: [
          {
            product_seller_id: {
              type: Schema.Types.ObjectId,
              ref: "product_seller"
            },
            pd_name: {
              type: String
            },
            pd_bran: {
              type: String
            },
            color: {
              type: String
            },
            size: {
              type: String
            },
            price: {
              type: Number
            },
            qty: {
              type: Number
            },
            pd_img: {
              type: String
            },
            delivery_date: {
              type: String
            }
          }
        ]
      }
    ],
    is_active: {
      type: String
    },
    created_date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    collection: "product_item"
  }
);

const Product_item = model("product_item", Product_items);
export default Product_item;
