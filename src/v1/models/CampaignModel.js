var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CampaignSchema = new Schema({
    promotion_name: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
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

module.exports = mongoose.model("Campaign", CampaignSchema, 'campaign');
