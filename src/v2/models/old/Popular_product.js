import { Schema, model } from "mongoose";

const popular_product = new Schema(
    {
        seller_id: {
            type: Schema.Types.ObjectId,
            ref: "seller",
            required: true,
        },
        product_id: [{
            type: Schema.Types.ObjectId,
            ref: "product_seller"
        }],
        is_active: {
            type: String,
            required: true,
            default: "active",
        },
        created_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        collection: "popular_product",
    }
);
const popular_products = model("popular_product", popular_product);
export default popular_products;
