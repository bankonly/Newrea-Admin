/** Router import */
import adminRouter from "./admin";
import unAuthenticateRouter from "./app";
import kernel from "../configs/kernel";

/** Middleware */
import apiAuthenticate from "../middlewares/ApiAuthentication";

export default app => {
  /** Admin Controller Router */
  app.use(kernel.routes.api, apiAuthenticate, adminRouter);

  /** unAuthenticate Router */
  app.use("/app", unAuthenticateRouter);
};
