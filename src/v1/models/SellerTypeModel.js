var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SellerTypeSchema = new Schema({
    name: {
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

module.exports = mongoose.model("SellerType", SellerTypeSchema, 'seller_type');
