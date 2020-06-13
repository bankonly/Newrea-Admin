import { Schema, model } from "mongoose";
const Notification_history = new Schema(
    {
        noti_id: {
            type: Schema.Types.ObjectId,
            ref: "notification",
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        read: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false
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
        collection: "notification_history"
    }
);

const Notification_historys = model("notification_history", Notification_history);

export default Notification_historys;
