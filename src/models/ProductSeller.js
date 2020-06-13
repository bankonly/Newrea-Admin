import { Schema, model } from "mongoose";
const ProductSeller = new Schema(
  {
    product_master_id: {
      type: Schema.Types.ObjectId,
      ref: "product_master",
      default: null,
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    product_option_id: {
      type: Schema.Types.ObjectId,
      ref: "products_option",
    },
    get_coins: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    price: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    shipping_fee_for_seller: {
      type: Number,
      default: 0,
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
  },
  {
    collection: "product_seller",
  }
);

const productSellers = model("product_seller", ProductSeller);

export default productSellers;
