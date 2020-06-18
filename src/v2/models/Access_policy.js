import mongoose from "mongoose";

/** Models */
import { Admin } from "./admin";
/** Import migrtion */
import AccessPolicyMigration from "../database/schema/access_policy_schema";

const { tableName, schema } = AccessPolicyMigration(mongoose);

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
export const AccessPolicyQB = new AccessQueryBuilder();
