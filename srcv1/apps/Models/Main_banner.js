import { Schema, model } from "mongoose"
const main_banner = new Schema({
    seller_id: {
        ref: Schema.Types.ObjectId,
        ref: "seller"
    },
    img: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
},
    {
        collation: "main_banner"
    })

const main_banners = model("main_banner", main_banner)

export default main_banners