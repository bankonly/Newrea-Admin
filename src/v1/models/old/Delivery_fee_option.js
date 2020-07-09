import { Schema, model } from "mongoose";

// Create Schema
const Delivery_fee_option_Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    percen: {
        type: Number,
        required: true,
        default: 0
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
}, {
    collection: "delivery_fee_option"
});

const Delivery_fee_option_Schemas = model("delivery_fee_option", Delivery_fee_option_Schema);
export default Delivery_fee_option_Schemas