import { Schema, model } from "mongoose"
const Customer_coin = new Schema({
    customer_id: {
        ref: Schema.Types.ObjectId,
        ref: "customer"
    },
    coin: {
        type: Number,
        required: true
    },
    source_of_coin: {
        type: String,
        required: true
    },
    credit_debit: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
},
    {
        collation: "customer_coin"
    })

const Customer_coins = model("customer_coin", Customer_coin)

export default Customer_coins