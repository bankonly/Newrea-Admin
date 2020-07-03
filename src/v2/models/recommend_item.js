const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recommend_item = new Schema({
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'product_seller',
        required: true
    },
    is_active: {
        type: String,
        default: "active",
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("recommend_item", Recommend_item, 'recommend_item');