import { Schema, model } from "mongoose";

const Driver = new Schema({
    user_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
        required: true
    },
    type_of_job: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id_card: {
        type: String,
        required: true
    },
    bank_account: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active"
    },
    dri_status: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now()
    },

}, {
    collation: "driver"
})

const driver = model("driver", Driver)
export default driver