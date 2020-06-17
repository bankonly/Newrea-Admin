import mongoose from "mongoose";

/** Import migrtion */
import AccessPolicyMigration from "../database/schema/access_policy_schema";

const { tableName, schema } = AccessPolicyMigration(mongoose);

const AcessPolicyModel = mongoose.model(tableName, schema);

/** Query Builder */
class AccessQueryBuilder {
  async findByAdminId(adminId) {
    return await AcessPolicyModel.findOne({ admin_id: adminId });
  }
}

export const AccessPolicy = AcessPolicyModel;
export const AccessPolicyQB = new AccessQueryBuilder();
