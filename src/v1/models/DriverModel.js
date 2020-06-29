var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var DriverSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
    },
    type_of_job: {
        type: String,
        // required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id_card: {
        type: String,
    },
    bank_account: {
        type: String,
        required: true
    },
    is_working: {
        type: Boolean,
        default: false
        // required: true,
    },
    geoLocation: [{
        lat: { type: String },
        long: { type: String }
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
}, opts);

DriverSchema.virtual('image_full_path').get(function() {
    return 'storage/drivers/' + this._id + '/image/' + this.profile_img;
});

module.exports = mongoose.model("Driver", DriverSchema, 'driver');
