const fs = require("fs");

module.exports = {
  IMAGE_TYPE_ACCEPT: process.env.IMAGE_TYPE_ACCEPT.split(","),
  DB_FETCH_LIMITER: parseInt(process.env.DB_FETCH_LIMITER),
  USER_ROLE: process.env.USER_ROLE,
  ADMIN_ROLE: process.env.ADMIN_ROLE,
  MAIL_ID: process.env.MAIL_ID,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  READ_STORAGE_PATH: "./storages/",
  ENV_APP: process.env.ENV_APP,
  TYPE_WRITE: "utf-8",
  PRIVATE_KEY: "keys",//fs.readFileSync("./private.key", "UTF-8"),
  JWT_ALGORITHMS: process.env.JWT_ALGORITHMS,
  TOKEN_LIFE_TIME: process.env.TOKEN_LIFE_TIME,
  IMAGE_SIZE_ALLOW: process.env.IMAGE_SIZE_ALLOW,
  IMG_PATH: {},
};
