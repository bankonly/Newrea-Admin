// Router import
import adminRouter from "./admin";
import accessPolicyRouter from "./access_policy";
import categoryRouter from "./category";
import unAuthenticateRouter from "./app";
import seller from "./seller";
import mostPopularRouter from "./most_popular";
import bannerRouter from "./banner";
import delivery_fee_option from "./delivery_fee_option";
import featuredStoreRouter from "./featured_store";
import popular_searchRouter from "./popular_search";

// configs
import kernel from "../configs/kernel";

// Middleware
import apiAuthenticate from "../middlewares/ApiAuthentication";

export default (app) => {
  // Api Authenticate Router Group
  app.use(kernel.routes.api, apiAuthenticate, [
    adminRouter,
    accessPolicyRouter,
    categoryRouter,
    seller,
    mostPopularRouter,
    delivery_fee_option,
    bannerRouter,
    featuredStoreRouter,
    popular_searchRouter,
  ]);

  // unAuthenticate Router
  app.use("/app", unAuthenticateRouter);
};
