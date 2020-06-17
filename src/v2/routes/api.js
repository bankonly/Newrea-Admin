import kernel from "../configs/kernel";
import Res from "../controllers/response_controller";
import ApiAuthentication from "../middlewares/ApiAuthentication";
import AdminCtl from "../controllers/admin_controller";

export default (app, router) => {
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
