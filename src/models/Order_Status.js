import { Schema, model } from "mongoose"
const Oreder_status = new Schema({
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
},
    {
        collection: "order_status"
    })

const Oreder_statuss = model("order_status", Oreder_status)

export default Oreder_statuss