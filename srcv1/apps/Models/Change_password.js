import { Schema, model } from "mongoose"
const change_password = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    data_change: {
        type: String,
        required: true
    },
    IMEI_UUID: {
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
        default: Date.now()
    }
}, {
    collection: "change_password"
})

const change_passwords = model("change_password", change_password)

export default change_passwords