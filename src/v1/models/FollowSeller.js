var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const follow_seller = new Schema(
    {
        seller_id: {
            type: Schema.Types.ObjectId,
            ref: "seller",
            required: true,
        },
        cus_id: {
            type: Schema.Types.ObjectId,
            ref: "customer",
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
            default: Date.now(),
        },
    },
    {
        collection: "follow_seller",
    }
);
module.exports = mongoose.model("follow_seller", follow_seller, 'follow_seller');