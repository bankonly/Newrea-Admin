var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CancelResonSchema = new Schema({
    reason: {
        type: String,
        required: true
    },
    cancel_by: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
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

module.exports = mongoose.model("CancelReason", CancelResonSchema, 'cancel_reason');
