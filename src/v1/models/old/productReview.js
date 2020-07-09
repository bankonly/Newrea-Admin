import { Schema, model } from "mongoose"
const productReview = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    },
    img: [],
    details: {
        type: String,
        required: true
    },
    star: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    }
},
    {
        collation: "product_review"
    }
)

const productReviews = model("product_review", productReview)

export default productReviews