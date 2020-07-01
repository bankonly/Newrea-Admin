var mongoose = require("mongoose");

const AdminSchema  = mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    // },
    name: {
        type: String,
        //required: true
    },
    phone: {
        type: String,
        ////required: null
    },
    email: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required:true
    },
    date_of_birth: {
        type: Date,
        ////required: null
    },
    UserType: {
        type: String,
        //required: null
    },
    is_active: {
        type: Boolean,
        //required: null,
        default: 1
    },
    //create_date: Date
}, {
    // timestamps: true
    // // createdAt: 'created_date',
    // // updatedAt: 'updated_date'
    timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    },
});


module.exports = mongoose.model('admin',AdminSchema, "admin");
//exports.GetAdminModel = AdminModel;