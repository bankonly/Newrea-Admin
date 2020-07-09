import { Schema as _Schema, model } from "mongoose"
const Schema = _Schema

const Cus_address = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    lat_long: [{
        latitude: {

        },
        longitude: {

        }
    }],
    is_default_address: {
        type: Boolean,
        default: false
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
        collection: "customer_address"
    })
const Cus_addresss = model("customer_address", Cus_address)
export default Cus_addresss