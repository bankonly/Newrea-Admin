import { Schema, model } from "mongoose";

const token = new Schema(
  {
    token: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true
    },
    user_type: {
      type: String,
      required: true
    },
    IMEI_UUID: {
      type: String
    },
    platform: {
      type: String
    },
    is_active: {
      type: String,
      required: true,
      default: "active"
    },
    created_date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    collection: "token"
  }
);
const tokens = model("token", token);
export default tokens;
