import mongoose from "mongoose";

/** Import migrtion */
import category_schema from "../database/schema/category_schema";
const { tableName, schema } = category_schema(mongoose);

const Category = mongoose.model(tableName, schema);

/** Query Builder */
class CategoryQueryBuilder {
  constructor() {
    this.model = Category;
  }
}

export const Model = Category;
export const ModelQB = new CategoryQueryBuilder();
