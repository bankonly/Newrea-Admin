import { Schema, model } from "mongoose"
const currency = new Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
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
        default: Date.now
    }
},
    {
        collation: "currency"
    })

const currencys = model("currency", currency)

export default currencys