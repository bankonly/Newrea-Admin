/** Router import */
import adminRouter from "./admin";
import accessPolicyRouter from "./access_policy";
import categoryRouter from "./category";
import unAuthenticateRouter from "./app";
import seller from "./seller";
import delivery_fee_option from "./delivery_fee_option";

/** configs */
import kernel from "../configs/kernel";

/** Middleware */
import apiAuthenticate from "../middlewares/ApiAuthentication";

export default (app) => {
  /** Api Authenticate Router Group */
  app.use(kernel.routes.api, apiAuthenticate, [
    adminRouter,
    accessPolicyRouter,
    categoryRouter,
    seller,
    delivery_fee_option,
  ]);

  /** unAuthenticate Router */
  app.use("/app", unAuthenticateRouter);
};
