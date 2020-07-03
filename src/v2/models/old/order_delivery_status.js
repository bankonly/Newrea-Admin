import { Schema, model } from "mongoose"
const cartItem = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: "order"
    },
    order_qr: {
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    },
    status_id: {
        type: String
    },
    driver_id: {
        type: String
    },
    payment_type: {
        type: String
    },
    comment: {
        type: String
    },
    is_active: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },

},
    {
        collation: "cart_item"
    })

const cartItems = model("cart_item", cartItem)

export default cartItems