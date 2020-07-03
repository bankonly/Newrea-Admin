var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var ShopFeedSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true,
    },
    cat_id: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    },
    is_active: {
        type: String,
        required: true,
        default: "active",
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
}, opts);

// ShopFeedSchema.virtual('image_full_path').get(function () {
//     return '/shop-feeds/' + this._id + '/image/' + this.img;
// });

module.exports = mongoose.model("ShopFeed", ShopFeedSchema, 'shop_feed');
