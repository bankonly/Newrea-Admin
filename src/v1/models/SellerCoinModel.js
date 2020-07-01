var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SellerCoinSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    coin: {
        type: Number,
        required: true,
        default: 0
    },
    credit_debit: {
        type: String,
        required: true
    },
    source_ofCoin: {
        type: String,
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

module.exports = mongoose.model("SellerCoin", SellerCoinSchema, 'seller_coin');
