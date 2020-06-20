/** Router import */
import adminRouter from "./admin";
import accessPolicyRouter from "./access_policy";
import categoryRouter from "./category";
import unAuthenticateRouter from "./app";
import seller from "./seller";
import mostPopularRouter from "./most_popular";

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
    mostPopularRouter,
  ]);

  /** unAuthenticate Router */
  app.use("/app", unAuthenticateRouter);
};
