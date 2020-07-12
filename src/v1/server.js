import express from "express";
import log from "chalk";
import passport from "passport";
import "./configs/default_config";
import "./configs/db";
import app_config from "./configs/app";
import setup_router from "./routes/setup";
import { initSocket } from "./configs/socket";

const app = express();

app_config(app);

setup_router(app);

app.use("/img", express.static(__dirname + "../../../../img"));

// start server
const listener = app.listen(process.env.APP_PORT);

// initialize socket.io
initSocket(listener);

console.log(`SERVER IS RUNNUNG ON PORT '${process.env.APP_PORT}'`);
