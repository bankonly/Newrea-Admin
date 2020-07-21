const mongoose = require("mongoose");
const { user_collection_name } = require("./user");

export const collection = "opt_setting";

const schema = new mongoose.Schema(
  {
    otp_expire_time: {
      type: Date,
      required: true,
    },
    allow_to_sent: {
      type: Number,
      default: 3,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const model = mongoose.model(collection, schema, collection);

export const OtpModel = model;
