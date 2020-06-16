import mongoose from "mongoose";

/** Import migrtion */
import AdminMgrations from "../../database/migrations/AdminMgrations";
const { tableName, schema } = AdminMgrations(mongoose);

const AdminModel = mongoose.model(tableName, schema);

/** Query Builder */
class AdminQueryBuilder {
  constructor() {
    this.model = AdminModel;
  }

  /** Find Seller By Id */
  async findByUserId({ id, isActive = [1, 0] }) {
    // 1 mean active
    return await this.model.findOne({ _id: id, is_active: { $in: isActive } });
  }

  /** Find Seller By name */
  async findByName({ name, isActive = [1, 0] }) {
    return await this.model.findOne({
      name: name,
      is_active: { $in: isActive }
    });
  }

  /** find Admin By Email */
  async findByEmail({ email, isActive = [1, 0] }) {
    return await this.model.findOne({
      "contact.email": email,
      is_active: { $in: isActive }
    });
  }
}

export const Admin = AdminModel;
export const AdminQB = new AdminQueryBuilder();
