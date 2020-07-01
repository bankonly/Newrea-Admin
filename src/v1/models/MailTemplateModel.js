var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MailTemplateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug_name: {
        type: String,
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

module.exports = mongoose.model("MailTemplate", MailTemplateSchema, 'mail_template');
