import mongoose from "mongoose";

/** Import migrtion */
import UserMigration from "../../database/migrations/UserMgrations";
const { tableName, schema } = UserMigration(mongoose);

const UserModel = mongoose.model(tableName, schema);

/** Query Builder */
class UserQueryBuilder {
  constructor() {
    this.model = User;
  }

  /** Find Seller By Id */
  async findById(id) {}

  /** Find Seller By name */
  async findByName(name){
    return UserModel.findOne()
  }
}

export const User = UserModel;
export const UserQB = new UserQueryBuilder();
