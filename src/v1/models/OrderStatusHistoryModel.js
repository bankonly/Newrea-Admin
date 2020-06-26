var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrderStatusHistorySchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'OrderStatus',
        required: true
    },
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true
    },
    //will be change ref : not sure about customer
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    updated_by_customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    updated_by_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    updated_by_admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        // required: true
    },
    updated_by_driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        // required: true
    },
    cancel_reason_id: {
        type: Schema.Types.ObjectId,
        ref: 'CancelReason',
        // required: true
    },
    is_active: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model("OrderStatusHistory", OrderStatusHistorySchema, 'order_status_history');
