var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

//const ProductSchema = mongoose.Schema({
var MainSliderSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    img: {
        type: String,
        // required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
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

MainSliderSchema.virtual('image_full_path').get(function() {
    return 'storage/main-banners/' + this._id + '/image/' + this.img;
});

module.exports= mongoose.model('main_sliders', MainSliderSchema, "main_sliders");
//exports.GetMainSlider = MainSliderModel;