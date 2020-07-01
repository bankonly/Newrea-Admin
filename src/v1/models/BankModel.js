var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BankSchema = new Schema({
    name_la: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
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

module.exports = mongoose.model("Bank", BankSchema, 'bank');
