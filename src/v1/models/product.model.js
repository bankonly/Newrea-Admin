const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const ProductSchema = mongoose.Schema({
    var ProductSchema = new Schema({
    // _id: { 
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // cat_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'category' //model name.
    // },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category' //model name.
    },
    cat_id:{
        type: Schema.Types.ObjectId
    },
    img: {
        type: String,
        ////required: null
    },
    created_date: {
        type: String,
        ////required: null
    },
    is_active: {
        type: Boolean,
        //required: true,
        default: 1
    },
    name: {
        type: String,
        //required: true
    },
    brand: {
        type: String,
        //required: true
    },
    SKU: {
        type: String,
        //required: true
    },
    // cat_id: {
    //     type: String,
    //     ////required: null
    // },
    is_added_by: {
        type: String,
        ////required: null,
    },
    desc: {
        type: String,
        ////required: true
    },
}, {
    // timestamps: true
    // // createdAt: 'created_date',
    // // updatedAt: 'updated_date'
    timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    },
});

module.exports = mongoose.model('Products', ProductSchema, 'product_master');
//module.exports = mongoose.model('Products', ProductSchema, 'product');