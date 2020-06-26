var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SellerAccountDetailSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    bank_name: {
        type: String,
        required: true
    },
    back_account_name: {
        type: String,
        required: true
    },
    account_no: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
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

module.exports = mongoose.model("SellerAccountDetail", SellerAccountDetailSchema, 'seller_account_detail');
