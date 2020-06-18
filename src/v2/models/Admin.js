import mongoose from "mongoose";

/** Import migrtion */
import admin_schema from "../database/schema/admin_schema";
const { tableName, schema } = admin_schema(mongoose);

const AdminModel = mongoose.model(tableName, schema);

/** Query Builder */
class AdminQueryBuilder {
  constructor() {
    this.model = AdminModel;
  }

  /** Find Seller By Id */
  findByUserId({ id }) {
    return this.model.findOne({ _id: id });
  }

  /** Find Seller By name */
  findByName({ name }) {
    return this.model.findOne({ name: name });
  }

  /** find Admin By Email */
  findByEmail({ email }) {
    return this.model.findOne({ "contact.email": email });
  }
}

export const Admin = AdminModel;
export const AdminQB = new AdminQueryBuilder();
