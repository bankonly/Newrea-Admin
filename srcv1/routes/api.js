import kernel from "../configs/kernel";
import Res from "../apps/Controllers/ResponseController";
import SellerTypeCtl from "../apps/Controllers/SellerTypeController";
import ApiAuthentication from "../apps/Middlewares/ApiAuthentication";
import AdminCtl from "../apps/Controllers/AdminController";

export default (app, router) => {
  /** SellerTypeController */
  router
    .get("/sellerType", (...args) => SellerTypeCtl(...args).getAllSellerType())
    .get("/sellerType/:id", (...args) => SellerTypeCtl(...args).getSellerType())
    .put("/sellerType", (...args) => SellerTypeCtl(...args).updateSellerType())
    .delete("/sellerType", (...args) =>
      SellerTypeCtl(...args).deleteSellerType()
    )
    .post("/sellerType", (...args) => SellerTypeCtl(...args).newSellerType());

  /** Admin Controller */
  router
    .get("/admin", (...args) => AdminCtl(...args).getAdminList())
    .get("/admin/:admin_id", (...args) => AdminCtl(...args).getAdminById())
    .delete("/admin/:admin_id", (...args) => AdminCtl(...args).deleteAdmin())
    .put("/admin/:admin_id", (...args) => AdminCtl(...args).updateAdmin());

  /** export route */
  app.use(kernel.routes.api, ApiAuthentication, router);
};
