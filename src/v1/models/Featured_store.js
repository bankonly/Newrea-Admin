var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Featured_store = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    is_active: {
        type: String,
        default: "active",
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("featured_store", Featured_store, 'featured_store');
