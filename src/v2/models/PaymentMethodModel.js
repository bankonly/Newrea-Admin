var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PaymentMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    is_active: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model(
  "PaymentMethod",
  PaymentMethodSchema,
  "payment_method"
);
