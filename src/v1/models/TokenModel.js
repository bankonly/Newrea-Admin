var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    // IMEI/UUID
    IMEI: {
        type: String,
    },
    platform: {
        type: String,
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

module.exports = mongoose.model("Token", TokenSchema, 'token');
