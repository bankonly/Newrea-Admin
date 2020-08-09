import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import { ssv_file_upload } from "ssv-file-upload";
import global_variable from "./global_variable";
import { _404 } from "../middlewares/error_handler";

export const preStart = (app) => {
  // allow cors origin
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(ssv_file_upload());

  app.use(global_variable);
};

export const preEnd = (app) => {
  // error handler
  app.use(_404);
};
