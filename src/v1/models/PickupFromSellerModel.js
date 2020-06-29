var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var PickupFromSellerSchema = new Schema({
    product_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductItem',
        required: true
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirm', 'complete'],
        default: 'pending'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    cancel_reason_id: {
        type: Schema.Types.ObjectId,
        ref: 'CancelReason',
        default: null
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
}, opts);


PickupFromSellerSchema.virtual('image_full_path').get(function() {
    return 'storage/pickup-seller/' + this._id + '/image/' + this.profile_img;
});

module.exports = mongoose.model("PickupFromSeller", PickupFromSellerSchema, 'pickup_from_seller');
