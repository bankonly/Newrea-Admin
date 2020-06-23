import mongoose from "mongoose";

// Import migrtion 
import schema_name from "../database/schema/schema_name";
const { tableName, schema } = schema_name(mongoose);

const ModelName = mongoose.model(tableName, schema);

// Query Builder 
class QueryBuilder {
  constructor() {
    this.model = ModelName;
  }
}

export const Model = ModelName;
export const ModelQB = new QueryBuilder();
