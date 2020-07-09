import { Schema, model } from "mongoose"
const mail_template = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    slug_name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
},
    {
        collation: "mail_template"
    })

const mail_templates = model("mail_template", mail_template)

export default mail_templates