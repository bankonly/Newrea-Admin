var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PromoCodeSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    product_id: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductMaster',
        required: true
    }],
    is_active: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model("PromoCode", PromoCodeSchema, 'promo_code');
