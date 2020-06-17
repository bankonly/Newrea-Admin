import { Schema, model } from "mongoose"
const Customer_FB = new Schema({
    fb_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile_img: {
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
    collection: "customer_fb"
}
)

const Customer_FBs = model("customer_fb", Customer_FB)

export default Customer_FBs