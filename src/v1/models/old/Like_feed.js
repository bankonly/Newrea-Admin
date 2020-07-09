import { Schema, model } from "mongoose";

const like_feed = new Schema(
    {
        seller_id: {
            type: Schema.Types.ObjectId,
            ref: "seller",
            required: true,
        },
        cus_id: {
            type: Schema.Types.ObjectId,
            ref: "customer",
            required: true,
        },
        shop_feed_id: {
            type: Schema.Types.ObjectId,
            ref: "shop_feed",
            required: true,
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
        collection: "like_feed",
    }
);
const like_feeds = model("like_feed", like_feed);
export default like_feeds;
