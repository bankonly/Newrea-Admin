// Router
import indexRouter from "./index";
import userRouter from "./user";
import resetPwdRouter from "./reset_password";

// configs
import kernel from "../configs/kernel";

// Middleware
import auth from "../middlewares/auth";
import auth_reset_password from "../middlewares/auth_reset_password";

export default (app) => {
  // Api Authenticate Router Group
  app.use(kernel.routes.api, [auth], [userRouter]);

  // Api Authenticate Reset Router Group
  app.use(kernel.routes.reset, [auth_reset_password], [resetPwdRouter]);

  // unAuthenticate Router
  app.use(kernel.routes.app, indexRouter);
};
