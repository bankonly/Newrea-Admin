var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema  = mongoose.Schema({
    // parent_id : {
    //     type: String,
    //     //////required: null
    // }, 
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: 'category' //model name.
    },
    // cat_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'category' //model name.
    // },
    is_active :  {
        type: Boolean,
        //required: true,
        default: 1
    },
    name :  {
        type: String,
        //required: true
    },
    slug_name : {
        type: String,
        ////required: null
    },
    img :  {
        type: String,
        //////required: null
    },
}, {
    //timestamps: true
    // createdAt: 'created_date',
    // updatedAt: 'updated_date'
    timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    },
});

module.exports= mongoose.model('category',  CategorySchema, "category");