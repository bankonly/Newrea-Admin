import mongoose from "mongoose";

/** Import migrtion */
import category_schema from "../database/schema/category_schema";
const { tableName, schema } = category_schema(mongoose);

const CategoryModel = mongoose.model(tableName, schema);

/** Query Builder */
class CategoryQueryBuilder {
  /** find by name */
  findByName(name) {
    return CategoryModel.findOne({
      name: name,
    });
  }

  /** find parent id */
  findByParentId(parentId) {
    return CategoryModel.find({
      parent_id: parentId,
    });
  }

  constructor() {
    this.model = CategoryModel;
  }
}

export const Category = CategoryModel;
export const CategoryQB = new CategoryQueryBuilder();
