var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CustomerAddressSchema = new Schema({
    cus_id: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        default: null
    },
    lat_long: {
        latitude: { type: String },
        longitude: { type: String }
    },
    is_default_address: {
        type: Boolean,
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active",
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.model("customer_address", CustomerAddressSchema, 'customer_address');
