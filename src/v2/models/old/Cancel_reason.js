import { Schema, model } from "mongoose";
const Driver_cancel_reason = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    used_by: {
      type: String,
      required: true
    },
    is_active: {
      type: String,
      required: true,
      default: "active"
    },
    created_date: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
  {
    collection: "cancel_reason"
  }
);

const Driver_cancel_reasons = model("cancel_reason", Driver_cancel_reason);

export default Driver_cancel_reasons;
