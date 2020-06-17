const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaSeller_Type = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    is_ative: {
      type: String,
      required: true,
      default: "active"
    },
    create_date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    collection: "seller_type"
  }
);
const Seller_Type = mongoose.model("seller_type", schemaSeller_Type);

class SellerTypeQueryBuilder {
  /** Get Seller Type By Name */
  findBySellerTypeName({ name, isActive = "active" }) {
    return Seller_Type.findOne({ name: name, is_active: isActive });
  }

  /** get Seller Type by _id */
  findById({ id, isActive = "active" }) {
    return Seller_Type.findOne({ _id: id, is_active: isActive });
  }
}

export const SelllerTypeQB = new SellerTypeQueryBuilder();
export const SellerType = Seller_Type;
