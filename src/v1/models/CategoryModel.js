var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var CategorySchema = new Schema({
    // not sure
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
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
        default: null
    },
    is_lifestyle: {
        type: Boolean,
        default: false,
        required: true
    },
    is_active: {
        type: String,
        required: true,
        default: "active",
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
}, opts);

// CategorySchema.virtual('image_full_path').get(function() {
//     return '/categories/' + this._id + '/image/' + this.img;
// });

module.exports = mongoose.model("category", CategorySchema, 'category');
