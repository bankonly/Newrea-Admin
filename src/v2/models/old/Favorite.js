import { Schema, model } from "mongoose"
const Customer_coin = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    ProductSellerId: {
        type: Schema.Types.ObjectId,
        ref: "ProductSellers"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

const Customer_coins = model("customer_coins", Customer_coin)

export default Customer_coins