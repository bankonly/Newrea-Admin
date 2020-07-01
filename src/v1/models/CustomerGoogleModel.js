var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CustomerFbSchema = new Schema({
    google_id: {
        type: String,
        required: true
    },
    // username
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
        default: null
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

module.exports = mongoose.model("CustomerGoogle", CustomerFbSchema, 'customer_google');
