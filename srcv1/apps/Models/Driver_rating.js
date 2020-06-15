import { Schema, model } from "mongoose"
const driver_rating = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: "product_seller",
        required: true
    },
    img: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    star: {
        type: Number,
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
},
    {
        collation: "driver_rating"
    })

const driver_ratings = model("driver_rating", driver_rating)

export default driver_ratings