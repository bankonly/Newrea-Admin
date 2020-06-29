var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toObject: { virtuals: true }, toJSON: { virtuals: true } };
var ProductOptions = new Schema(
  {
    option_title: [],
    option_detail: [],
    created_date: {
      type: Date,
      default: Date.now(),
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  opts
);

module.exports = mongoose.model(
  "products_option",
  ProductOptions,
  "products_option"
);
