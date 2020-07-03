import { Schema, model } from "mongoose";

const comment_feed = new Schema(
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
        comment: {
            type: String
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
        collection: "comment_feed",
    }
);
const comment_feeds = model("comment_feed", comment_feed);
export default comment_feeds;
