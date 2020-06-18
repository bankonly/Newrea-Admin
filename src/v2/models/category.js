import mongoose from "mongoose";

/** Import migrtion */
import category_schema from "../database/schema/category_schema";
const { tableName, schema } = category_schema(mongoose);

const Category = mongoose.model(tableName, schema);

/** Query Builder */
class CategoryQueryBuilder {
  /** find by name */
  findByName(name) {
    return Category.findOne({
      name: name,
    });
  }

  /** find parent id */
  findByParentId(parentId) {
    return Category.find({
      parent_id: parentId,
    });
  }

  constructor() {
    this.model = Category;
  }
}

export const Category = Category;
export const CategoryQB = new CategoryQueryBuilder();
