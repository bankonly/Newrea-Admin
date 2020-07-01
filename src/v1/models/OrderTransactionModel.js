var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrderTransactionSchema = new Schema({
    payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
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

module.exports = mongoose.model("OrderTransaction", OrderTransactionSchema, 'order_transaction');
