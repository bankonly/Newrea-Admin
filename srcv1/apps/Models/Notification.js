import { Schema, model } from "mongoose";
const Notification = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "admin"
    },
    receivers: {
      type: String,
      required: true
    },
    img: [],
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
    collection: "notification"
  }
);

const Notifications = model("notification", Notification);

export default Notifications;
