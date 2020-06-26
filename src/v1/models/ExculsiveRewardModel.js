var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ExculsiveRewardSchema = new Schema({
    img: {
        type: String,
    },
    header: {
        type: String,
        required: true
    },
    bgcolor: {
        type: String,
    },
    txtcolor: {
        type: String,
    },
    btncolor: {
        type: String,
    },
    btntxt: {
        type: String,
    },
    target: {
        type: String,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
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

module.exports = mongoose.model("ExculsiveReward", ExculsiveRewardSchema, 'exculsive_reward');
