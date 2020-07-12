// Router
import indexRouter from "./index";
import userRouter from "./user";

// configs
import kernel from "../configs/kernel";

// Middleware
import auth from "../middlewares/auth";

export default (app) => {
  // Api Authenticate Router Group
  app.use(kernel.routes.api, [auth], [userRouter]);

  // unAuthenticate Router
  app.use(kernel.routes.app, indexRouter);
};
