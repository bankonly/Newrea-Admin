var mongoose = require("mongoose");

const SellerSchema  = mongoose.Schema({
    //_id: Object,
    // seller_type_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'seller_type',
    //     ////required: null
    // },
    // _id: {
    //     type: mongoose.Types.ObjectId,
    // },
    is_active: {
        type: Boolean,
        ////required: null
    },
    com: {
        type: String,
        ////required: null
    },
    is_online: {
        type: Boolean,
        ////required: null
    },
    //created_date: Date,
    user_name: {
        type: String,
        //required: true
    },
    name: {
        type: String,
        //required:true
    },
    pass: {
        type: String,
        //required:true
    },
    phone: {
        type: String,
        //required: true
    },
    img: {
        type: String,
        ////required: null
    },
    logo: {
        type: String,
        ////required: null
    },
    // location: {
    //     type: String,
    //     ////required: null
    // },
    // location: [{
    //     latitude: {
    //         type: Number,
    //         //required: true,
    //         default: 0
    //     },
    //     longitude: {
    //         type: Number,
    //         //required: true,
    //         default: 0
    //     },
    // }],
    location: {type: Object},
    address: {
        type: String,
        ////required: null
    },
    seller_type_id: {
        type: String,
        ////required: null
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

module.exports = mongoose.model('seller',SellerSchema, 'seller');
//exports.GetSellerModel = sellerModel;