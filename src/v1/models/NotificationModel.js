var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    //will be ref to parent Collection
    sender_id: {
        type: String,
        required: true
    },
    sender_type: {
        type: String,
        enum: ['cust', 'driver', 'admin', 'seller'],
        default: 'pending'
    },
    receivers: [{
        reciever_id: {
            type: String
        }
    }],
    read: [{
        reciever_id: {
            type: String
        },
        date: {
            type: Date,
        }
    }],
    delete: [{
        reciever_id: {
            type: String
        },
        date: {
            type: Date,
        }
    }],
    type: {
        type: String,
    },
    img: [{
        type: String,
    }],
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

module.exports = mongoose.model("Notification", NotificationSchema, 'notification');
