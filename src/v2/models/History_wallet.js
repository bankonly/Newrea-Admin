import { Schema, model } from "mongoose";
const history_wallet = new Schema(
  {
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
    create_date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "history_wallet",
  }
);

const history_wallets = model("history_wallet", history_wallet);

export default history_wallets;
