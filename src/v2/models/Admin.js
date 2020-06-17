import mongoose from "mongoose";

/** Import migrtion */
import AdminMgrations from "../database/migrations/AdminMgrations";
const { tableName, schema } = AdminMgrations(mongoose);

const AdminModel = mongoose.model(tableName, schema);

/** Query Builder */
class AdminQueryBuilder {
  constructor() {
    this.model = AdminModel;
  }

  /** Find Seller By Id */
  async findByUserId({ id }) {
    return await this.model.findOne({ _id: id });
  }

  /** Find Seller By name */
  async findByName({ name }) {
    return await this.model.findOne({ name: name });
  }

  /** find Admin By Email */
  async findByEmail({ email }) {
    return await this.model.findOne({ "contact.email": email });
  }
}

export const Admin = AdminModel;
export const AdminQB = new AdminQueryBuilder();
