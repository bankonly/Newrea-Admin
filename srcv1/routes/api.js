import kernel from "../configs/kernel";
import Res from "../apps/Controllers/ResponseController";
import SellerCtl from "../apps/Controllers/SellerController";

export default (app, router) => {
  router
    .get("/seller", (...args) => SellerCtl(...args).getSeller())
    .post("/seller", (...args) => SellerCtl(...args).getSeller());

  /** export route */
  app.use(kernel.routes.api, router);
};
