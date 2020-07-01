var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DeliveryFeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_by_distance: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
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

module.exports = mongoose.model("DeliveryFee", DeliveryFeeSchema, 'delivery_fees');
