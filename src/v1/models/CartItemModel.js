var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CartItemSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSeller',
        required: true
    },
    product_option_detail_ids: {
        type: Schema.Types.ObjectId,
        required: true
    },
    qty: {
        type: Number,
        default: 1,
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

module.exports = mongoose.model("CartItem", CartItemSchema, 'cart_item');
