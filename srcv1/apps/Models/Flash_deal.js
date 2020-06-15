import { Schema, model } from "mongoose"
const flash_deal = new Schema({
    product_seller_id: [{
        type: Schema.Types.ObjectId,
        ref: "product_seller"
    }],
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    percent: {
        type: Number,
        required: true,
        default: 0
    },
    // price: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
        // required: Date.now()
    },
    created_date: {
        type: Date,
        // required: Date.now()
    },
    is_active: {
        type: String,
        required: true,
        default: "active"
    },

},
    {
        collection: "flash_deal"
    })

const flash_deals = model("flash_deal", flash_deal)

export default flash_deals