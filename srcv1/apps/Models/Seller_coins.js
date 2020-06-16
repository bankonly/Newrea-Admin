import { Schema, model } from "mongoose"
const Seller_coin = new Schema({
    seller_id: {
        ref: Schema.Types.ObjectId,
        ref: "dp_sellers"
    },
    coin: {
        type: Number,
        required: true
    },
    credit_debit: {
        type: String,
        required: true
    },
    source_OfCoin: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
}, {
    collation: "seller_coin"
}
)

const Seller_coins = model("seller_coin", Seller_coin)

export default Seller_coins