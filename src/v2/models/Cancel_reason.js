const mongoose = require("mongoose");

const CancelReason = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    used_by: {
      type: String,
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
    collection: "cancel_reason",
  }
);

module.exports = mongoose.model("cancel_reason", CancelReason, "cancel_reason");
