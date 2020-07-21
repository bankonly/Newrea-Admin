import express from "express";
import log from "chalk";
import passport from "passport";
import "./configs/default_config";
import "./configs/db";
import { preStart, preEnd } from "./configs/app";
import setup_router from "./routes/setup";
import { initSocket } from "./configs/socket";

const app = express();

preStart(app); // initialize middleware first start

setup_router(app); // register route

app.use("/img", express.static(__dirname + "../../../../img")); // image path

preEnd(app); // initialize middleware after routed

const listener = app.listen(process.env.APP_PORT); // start server

initSocket(listener); // initialize socket.io

console.log(`SERVER IS RUNNUNG ON PORT '${process.env.APP_PORT}'`);
