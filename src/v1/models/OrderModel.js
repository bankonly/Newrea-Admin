var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var AutoIncrement = require("mongoose-sequence");
const orderNumber = AutoIncrement(mongoose);

var OrderSchema = new Schema({
  cus_id: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  pd_item_id: {
    type: Schema.Types.ObjectId,
    ref: "product_item",
    required: true,
  },
  promo_code_id: {
    type: Schema.Types.ObjectId,
    ref: "promo_code",
    default: null,
  },
  order_status_id: {
    type: Schema.Types.ObjectId,
    ref: "order_status",
    required: true,
  },
  coin_used: {
    type: Number,
    required: true,
    default: 0,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "customer_address",
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
    default: 0,
  },
  currency_id: {
    type: Schema.Types.ObjectId,
    ref: "currency",
    // required: true,
  },
  invoice_no: {
    type: String,
    required: true,
  },
  invoice_date: {
    type: Date,
    default: new Date(),
  },
  total_discount: {
    type: Number,
    required: true,
    default: 0,
  },
  total_discount_tax: {
    type: Number,
    required: true,
    default: 0,
  },
  total_shipping: {
    type: Number,
    required: true,
    default: 0,
  },
  total_shipping_tax: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  total_tax: {
    type: Number,
    required: true,
    default: 0,
  },
  delivery_type_id: {
    type: Schema.Types.ObjectId,
    ref: "delivery_type",
    default: null,
  },
  payment_method_id: {
    type: Schema.Types.ObjectId,
    ref: "payment_method",
  },
  is_active: {
    type: String,
    required: true,
    default: "active",
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
var test = OrderSchema.plugin(orderNumber, { inc_field: "order_number" });
// console.log(test);
OrderSchema = test;
module.exports = mongoose.model("order", test, "order");
