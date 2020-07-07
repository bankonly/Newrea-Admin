var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var MainBannerSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'seller',
        default: null
    },
    img: {
        type: String
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
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
    }
});
module.exports = mongoose.model("main_banner", MainBannerSchema, 'main_banner');