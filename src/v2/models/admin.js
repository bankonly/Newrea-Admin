import mongoose from "mongoose";

const tableName = "admin";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 100,
      required: true,
    },
    age: {
      type: Number,
      default: null,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        default: null,
      },
    },
    is_online: {
      type: String,
      default: "online", // "0 = inactive,1 = active"
      required: true,
    },
    block_status: {
      type: Number,
      max: 1,
      default: 0, // "0 = unbanned ,1 = banned"
    },
    password: {
      type: String,
      required: true,
    },
    login_count: {
      type: Number,
      default: 0,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
    access_policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "access_policy",
      required: true,
    },
  },
  { collection: tableName, timestamps: true }
);

const Admin = mongoose.model(tableName, schema);

module.exports = Admin;
