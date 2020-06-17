import { Schema, model } from 'mongoose'

const bank = new Schema({
    name_la: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    logo: {
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
        required: true,
        default: Date.now()
    }
}, {
    collection: "bank"
})
const banks = model("bank", bank)
export default banks