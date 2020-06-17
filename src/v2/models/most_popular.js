import mongoose from "mongoose";

/** Import migrtion */
import most_popular_schema from "../database/schema/most_popular_schema";
const { tableName, schema } = most_popular_schema(mongoose);

const Most_Popular = mongoose.model(tableName, schema);

/** Query Builder */
class QueryBuilder {
  constructor() {
    this.model = Most_Popular;
  }
}

export const Model = Most_Popular;
export const ModelQB = new QueryBuilder();
