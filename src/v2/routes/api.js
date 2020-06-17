import kernel from "../configs/kernel";
import Res from "../controllers/ResponseController";
import SellerTypeCtl from "../controllers/SellerTypeController";
import ApiAuthentication from "../Middlewares/ApiAuthentication";
import AdminCtl from "../controllers/AdminController";

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
    .put("/admin/:admin_id", (...args) => AdminCtl(...args).updateAdmin())
    .post("/admin/changePassword", (...args) => AdminCtl(...args).changePassword());
    
  /** export route */
  app.use(kernel.routes.api, ApiAuthentication, router);
};
