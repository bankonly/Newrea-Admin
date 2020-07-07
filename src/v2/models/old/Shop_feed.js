import { Schema, model } from "mongoose";

const shop_feed = new Schema(
  {
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
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
    collection: "shop_feed",
  }
);
const shop_feeds = model("shop_feed", shop_feed);
export default shop_feeds;
