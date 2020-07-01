var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DeliveryTypeSchema = new Schema({
    // Express / Standrad
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        default: "active",
        enum:["active","inactive"]
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model("delivery_type", DeliveryTypeSchema, 'delivery_type');
