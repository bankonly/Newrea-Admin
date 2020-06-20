import mongoose from "mongoose";

const tableName = "access_policy";
const schema = new mongoose.Schema(
  /** ref to admin whcih page admin can access */
  /** 1 = full control */
  /** 2 = readonly */
  /** 3 = hidden */
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
    catagory: {
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
    popular_screen: {
      type: Number,
      default: 1,
    },
    reason: {
      type: Number,
      default: 1,
    },
    return: {
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
    is_super_admin: {
      type: Boolean,
      required: true,
    },
  },
  { collection: tableName, timestamps: true }
);

const AccessPolicy = mongoose.model(tableName, schema);

<<<<<<< HEAD:src/v2/models/access_policy.js
const AcessPolicyModel = mongoose.model(tableName, schema);

/** Query Builder */
class AccessQueryBuilder {
  /** get access policy with adminId */
  getAccessPolicyByAdminId(adminId) {
    return Admin.findById(adminId).populate({
      path: "access_policy",
    });
  }

  /** find access by name */
  findByName(name) {
    return AccessPolicy.findOne({ name: name });
  }
}

export const AccessPolicy = AcessPolicyModel;
=======
export { AccessPolicy };
>>>>>>> d196840db2412f761c4ae1adab8b20e67ff23dfe:src/v2/models/Access_policy.js
