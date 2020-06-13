import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const delivery_type = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
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
        collation: "delivery_type"
    })
const delivery_types = model("delivery_type", delivery_type)
export default delivery_types