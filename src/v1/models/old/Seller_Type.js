const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaSeller_Type = new Schema({
    name: {
        type: String,
        required: true
    },
    is_ative: {
        type: String,
        required: true,
        default: "active"
    },
    create_date: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "seller_type"
    })
const Seller_Type = mongoose.model("seller_type", schemaSeller_Type)
module.exports = Seller_Type