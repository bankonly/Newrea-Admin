const { DB } = require("newrea_model");
const env = process.env;

DB.connect({
  driver: env.DB_DRIVER,
  host: env.DB_HOST,
  port: env.DB_PORT,
  db_name: env.DB_NAME,
});
