const mongoose = require('mongoose');

const DriverSchema  = mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    // },
    is_active: {
        type: Boolean,
        ////required: null,
        //default:1
    },
    dri_status: {
        type: Boolean,
        default:true
        ////required: null
    },
    created_date: {
        type: Date,
        ////required: null
    },
    user_name: {
        type: String,
        //required: true
    },
    first_name: {
        type: String,
        //required: true
    },
    last_name: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required:true 
    },
    phone_number: {
        type: String,
        ////required: null
    },
    profile_img: {
        type: String,
        ////required: null
    },
    is_working: {
        type: Boolean,
        ////required: null
    },
    driver_id: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }
}, {
    // timestamps: true,
    // // createdAt: 'created_date',
    // // updatedAt: 'updated_date'
    timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    },
});

module.exports = mongoose.model('driver',DriverSchema, 'driver');