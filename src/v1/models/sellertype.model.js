var mongoose = require("mongoose");

const Seller_type_Schema  = mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    // },
    is_active: {
        type: Boolean,
        ////required: null
    },
    name: {
        type: String,
        ////required: true
    }
}, {
    // timestamps: true
    // // createdAt: 'created_date',
    // // updatedAt: 'updated_date'
    timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    },
});

module.exports = mongoose.model('seller_type', Seller_type_Schema, 'seller_type');