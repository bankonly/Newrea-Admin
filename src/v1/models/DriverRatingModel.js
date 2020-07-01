var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DriverRatingSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    product_seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSeller',
        required: true
    },
    img: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    star: {
        type: Number,
        required: true,
        default: 0
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

module.exports = mongoose.model("DriverRating", DriverRatingSchema, 'driver_rating');
