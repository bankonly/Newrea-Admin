import { Schema, model } from "mongoose"
const rating_seller = new Schema({
    start: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    cus_id: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
},
    {
        collation: "rating_seller"
    })

const rating_sellers = model("rating_seller", rating_seller)

export default rating_sellers