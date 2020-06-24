const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  keyWord: {
    type: String,
    required: true,
  },
  is_active: {
    type: String,
    enum: ["active", "inActive"],
    default: "active",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  "popular_search",
  SellerSchema,
  "popular_search"
);
