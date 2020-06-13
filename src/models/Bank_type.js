import { Schema, model } from 'mongoose'

const bank_type = new Schema({
    name: {
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
    collection: "bank_type"
})
const bank_types = model("bank_type", bank_type)
export default bank_types