import { Schema, model } from "mongoose"
const products_optionSchema = new Schema({
    option_title: [],
    option_detail: [],
    created_date: {
        type: Date,
        default: Date.now()
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    collection: "products_option"
})

const products_option = model("products_option", products_optionSchema)

export default products_option