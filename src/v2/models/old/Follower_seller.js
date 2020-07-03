import { Schema, model } from "mongoose";

const follower_seller = new Schema(
    {
        seller_id: {
            type: Schema.Types.ObjectId,
            ref: "seller",
            required: true,
        },
        cus_id: {
            type: Schema.Types.ObjectId,
            ref: "customer"
        },
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
        collection: "follower_seller",
    }
);
const follower_sellers = model("follower_seller", follower_seller);
export default follower_sellers;
