var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
        // required: true
    },
    date_of_birth: {
        type: Date,
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
}, opts);

AdminSchema.virtual('image_full_path').get(function() {
    return '/admin/' + this._id + '/image/' + this.img;
});

module.exports = mongoose.model("Admin", AdminSchema, 'admin');
