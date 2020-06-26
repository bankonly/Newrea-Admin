var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var ProductReviewSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSeller',
        default: null
    },
    img: [{
        type: String,
    }],
    details: {
        type: String,
        required: true
    },
    star: {
        type: Number,
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
}, opts);

ProductReviewSchema.virtual('image_full_path').get(function() {
    return '/product-review/' + this._id + '/image/' + this.img;
});

module.exports = mongoose.model("ProductReview", ProductReviewSchema, 'product_review');

