var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PickupFromAdminSchema = new Schema({
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    // will be change to ref of parent table with FK
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    cancel_reason_id: {
        type: Schema.Types.ObjectId,
        ref: 'CancelReason',
        required: true
    },
    comment: {
        type: String,
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

module.exports = mongoose.model("PickupFromAdmin", PickupFromAdminSchema, 'pickup_from_admin');
