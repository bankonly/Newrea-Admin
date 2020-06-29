var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PoliceSchema = new Schema({
    product_master_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductMaster',
        required: true
    },
    desc: {
        type: String,
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
});

module.exports = mongoose.model("Policy", PoliceSchema, 'policy');
