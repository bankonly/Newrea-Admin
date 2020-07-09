import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const deliveryFee = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    pric_by_distance: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
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
    collation: "delivery_fee"
})
const deliveryFees = model("delivery_fee", deliveryFee)
export default deliveryFees