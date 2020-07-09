import mongoose from "mongoose";

const tableName = "access_policy";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: Number,
      default: 1,
    },
    most_popular: {
      type: Number,
      default: 1,
    },
    featured_stores: {
      type: Number,
      default: 1,
    },
    recommended_item: {
      type: Number,
      default: 1,
    },
    category: {
      type: Number,
      default: 1,
    },
    driver_approved: {
      type: Number,
      default: 1,
    },
    banner: {
      type: Number,
      default: 1,
    },
    popular_search: {
      type: Number,
      default: 1,
    },
    reason: {
      type: Number,
      default: 1,
    },
    order: {
      type: Number,
      default: 1,
    },
    seller: {
      type: Number,
      default: 1,
    },
    brand: {
      type: Number,
      default: 1,
    },
    categories: {
      type: Number,
      default: 1,
    },
    currency: {
      type: Number,
      default: 1,
    },
    delivery_type: {
      type: Number,
      default: 1,
    },
    delivery_fee: {
      type: Number,
      default: 1,
    },
    payment_method: {
      type: Number,
      default: 1,
    },
    is_super_admin: {
      type: Boolean,
      required: true,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
  },
  { collection: tableName, timestamps: true }
);

const AccessPolicy = mongoose.model(tableName, schema);

module.exports = AccessPolicy;
