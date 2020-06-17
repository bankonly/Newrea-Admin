import { Schema, model } from "mongoose"
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
    created_date: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "category"
})

const Categorys = model("category", Category)

export default Categorys