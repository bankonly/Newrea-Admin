var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProductItemSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    item: [{
        option: [{
            pd_name: {
                type: String,
                required: true
            },
            pd_brand: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            pd_img: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            delivery_date: {
                type: Date,
                required: true
            },
            delivery_fee: {
                type: Number,
                required: true
            },
            promo_code_id: {
                // type: Schema.Types.ObjectId,
                // ref: 'Order',
                type: String,
                required: true
            }
        }],

        seller_id: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true
        },
        product_seller_id: {
            type: Schema.Types.ObjectId,
            ref: 'ProductSeller',
            required: true
        },
        order_status_id: {
            type: Schema.Types.ObjectId,
            ref: 'OrderStatus',
            required: true
        },
    }],
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

module.exports = mongoose.model("ProductItem", ProductItemSchema, 'product_item');
