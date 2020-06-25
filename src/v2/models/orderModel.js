var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    cus_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    order_number: {
        type: String,
        required: true
    },
    discount_money: {
        type: Number,
        default: 0
    },
    discount_percentage: {
        type: Number,
        default: 0
    },
    coin_used: {
        type: Number,
        required: true,
        default: 0
    },
    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'CustomerAddress',
        // required: true
    },
    delivery_address: [{
        latitude: {
            type: Number,
            required: true,
            default: 0
        },
        longitude: {
            type: Number,
            required: true,
            default: 0
        },
    }],
    total_price: {
        type: Number,
        required: true,
        default: 0
    },
    tax: {
        type: Number,
        required: true,
        default: 0
    },
    currency_id: {
        type: Schema.Types.ObjectId,
        ref: 'Currency',
        required: true
    },
    invoice_no: {
        type: String,
        // required: true
    },
    invoice_date: {
        type: Date,
        default: new Date()
    },
    total_discount: {
        type: Number,
        required: true,
        default: 0
    },
    total_discount_tax: {
        type: Number,
        required: true,
        default: 0
    },
    total_shipping: {
        type: Number,
        required: true,
        default: 0
    },
    total_shipping_tax: {
        type: Number,
        required: true,
        default: 0
    },
    // total + shipping = net_price
    net_price: {
        type: Number,
        required: true,
        default: 0
    },
    total_tax: {
        type: Number,
        required: true,
        default: 0
    },
    delivery_fee_id: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryFee',
    },
    delivery_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryType',
    },
    payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
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

module.exports = mongoose.model("Order", OrderSchema, 'order');