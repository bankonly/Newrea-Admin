import { Schema, model } from 'mongoose'

const wallet = new Schema({
    bank_id: {
        type: Schema.Types.ObjectId,
        ref: "bank",
        required: true
    },
    sell_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    bank_acc_name: {
        type: String,
        required: true
    },
    bank_acc_no: {
        type: String,
        required: true
    },
    bank_type_id: {
        type: Schema.Types.ObjectId,
        ref: "bank_type",
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active"
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: "wallet"
})
const wallets = model("wallet", wallet)
export default wallets