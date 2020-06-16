import express from "express";
import log from "chalk";
import passport from "passport";


/** Config Import */
/** Load ENV  */
import defaultConfig from "./configs/default_config"
import appConfig from "./configs/app"
import database from "./configs/db"

/* ROUTES */
import apiRoute from "./routes/api";
import api from "./routes/api";
import appRoute from "./routes/app";

/** Middleware */
import Authentcate from "./apps/Middlewares/ApiAuthentication"


/** Load default config */
const app = express();
const router = express.Router();


/* LOAD ALL DEFAULT CONFIGURATIONS */
appConfig(app)


/* LOAD IMAGE PATH */
app.use("/public", express.static(__dirname + "/public"));

/** Load Route */
appRoute(app,router) /** For /app */
app.use(Authentcate)
api(app,router) /** For /api */

try {
  /* RUN PROGRAM BASE ON ENV PORT */
  app.listen(process.env.APP_PORT, (e) =>
    console.log("CONNECTED TO ", process.env.APP_PORT)
  );
} catch (error) {
  console.log(log.red(error.message));
}
