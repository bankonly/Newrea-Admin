var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FilterSchema = new Schema(
  {
    // Express / Standrad
    name: {
      type: String,
      required: true,
    },
    price: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      step:{
        type:Number,
        required:true,
        default:1000
      }
    },
    size: [],
    color: [],
    brand: {
      type: Array,
      require: true,
    },
    gender: {
      type: Array,
      require: true,
    },
    is_active: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("filter", FilterSchema, "filter");
