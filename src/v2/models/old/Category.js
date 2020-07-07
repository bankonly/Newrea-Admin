import { Schema, model } from "mongoose"
const { getDate } = require("../../helpers/Global")

const Category = new Schema({
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "category",
        default: null
    },
    name: {
        type: String,
        required: true
    },
    slug_name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active"
    },
    // created_date: {
    //     type: Date,
    //     default: new Date().toISOString()
    // }
}, {
    collection: "category",
    timestamps:true
})

const Categorys = model("category", Category)

export default Categorys