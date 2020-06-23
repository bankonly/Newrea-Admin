import mongoose from "mongoose";

const tableName = "main_banner";
const schema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      default: null,
    },
    img: {
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
    created_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    collation: tableName,
  }
);

module.exports = mongoose.model("main_banner", schema);
