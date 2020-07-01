var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RecommendedProductItemSchema = new Schema({
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSeller',
        required: true
    },
    product_master_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductMaster',
        required: true
    },
    product_option_detail_id: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model("RecommendedProductItem", RecommendedProductItemSchema, 'recommended_product_item');
