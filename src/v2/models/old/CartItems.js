import { Schema, model } from "mongoose"
const cartItem = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    },
    qty: {
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