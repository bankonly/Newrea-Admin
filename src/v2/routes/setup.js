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
import reasonRouter from "./reason";
import brandRouter from "./brand";
import productSellerRouter from "./product_seller";
import recommedItemRouter from "./recommend_item";
import subCateoryRouter from "./categories";
import driverRouter from "./driver";
import orderRouter from "./order";
import customerRouter from "./customer";
import customerAddressRouter from "./customer_address";
import currencyRouter from "./currency";
import paymentMethodRouter from "./paymentMethod";
import deliveryTypeRouter from "./delivery_type";

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
    reasonRouter,
    brandRouter,
    productSellerRouter,
    recommedItemRouter,
    subCateoryRouter,
    driverRouter,
    orderRouter,
    customerRouter,
    customerAddressRouter,
    currencyRouter,
    paymentMethodRouter,
    deliveryTypeRouter,
  ]);

  // unAuthenticate Router
  app.use("/app", unAuthenticateRouter);
};
