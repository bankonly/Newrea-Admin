var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getDate } = require("../helpers/Global")

var Categories = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: null
    },
    img: {
        type: String,
        required: true
    },
    new_arrivals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product_seller'
        }
    ],
    cat_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    ],
    popular_item: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product_seller'
        }
    ],
    brand: [
        {
            type: Schema.Types.ObjectId,
            ref: 'brand'
        }
    ],
    clearance_item: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product_seller'
        }
    ],
    accessories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product_seller'
        }
    ],
    recommend_store: [
        {
            type: Schema.Types.ObjectId,
            ref: 'seller'
        }
    ],
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

module.exports = mongoose.model("categories", Categories, 'categories');
