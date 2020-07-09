import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const promo_codes = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    limited: {
        type: Number,
        required: true,
        default: 0
    },
    percent: {
        type: Number,
        required: true,
        default: 0
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    }],
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
        collection: "promo_code"
    })
const promo_codess = model("promo_code", promo_codes)
export default promo_codess