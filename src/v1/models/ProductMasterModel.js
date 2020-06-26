var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var ProductMasterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    product_option_id: {
        type: Schema.Types.ObjectId,
        ref: 'product_option',
        required: true
    },
    desc: { type: String },
    img: [{ type: String }],
    SKU: { type: String },
    // will be change to ref to master model
    is_added_by: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    cat_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
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
}, opts);

// ProductMasterSchema.virtual('image_full_path').get(function () {
//     console.log("image_full_path :: ")
//     // return ['/products/' + this._id + '/image/' + this.img];
//     var id = this.id;
//     var imgs = [];
//     this.img.forEach(function (e) {
//         // e = e.toObject();
//         e = '/products/' + id + '/image/' + e;
//         imgs.push(e);
//         console.log("e ::", e);
//     });
//     console.log("this.img :: ", imgs);
//     return imgs;
// });

module.exports = mongoose.model("product_master", ProductMasterSchema, 'product_master');
