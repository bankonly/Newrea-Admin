const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CustmerSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    profile_img: {
        type: String
    },
    customer_fb_id: {
        type: Schema.Types.ObjectId,
        ref: "customer_fb"
    },
    date_of_birth: {
        type: Date,
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
        collection: "customer"
    }
);
const Customer = mongoose.model("customer", CustmerSchema);
module.exports = Customer