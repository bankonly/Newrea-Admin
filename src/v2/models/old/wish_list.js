import { Schema, model } from "mongoose"
const wish_list = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    },
    created_date: {
        type: Date,
        default: Date.now()
    },

},
    {
        collation: "wish_list"
    })

const wishLists = model("wish_list", wish_list)

export default wishLists