const { Router } = require("express");
const router = Router();
const AdminCtrl = require("../controllers/admin_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];
const {
  resetPasswordValidator,
} = require("./../middlewares/validations/commonValidator");

router
  .get("/admin/me", AdminCtrl.whoami)
  .get("/admin", mdw, AdminCtrl.getAdminList)
  .get("/admin/:admin_id", mdw, AdminCtrl.getAdminById)
  .delete("/admin/:admin_id", mdw, AdminCtrl.deleteAdmin)
  .put("/admin/:admin_id", AdminCtrl.updateAdmin)
  .post("/admin/changePassword", AdminCtrl.changePassword)
  .post("/admin/profile", AdminCtrl.profile)
  .put(
    "/admin/resetPassword/:id",
    [mdw, resetPasswordValidator],
    AdminCtrl.resetPassword
  );

export default router;
