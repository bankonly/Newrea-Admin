const { Router } = require("express");
const router = Router();
const AdminCtrl = require("../controllers/admin_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/admin/me", AdminCtrl.whoami)
  .get("/admin", AdminCtrl.getAdminList)
  .get("/admin/:admin_id", mdw, AdminCtrl.getAdminById)
  .delete("/admin/:admin_id", mdw, AdminCtrl.deleteAdmin)
  .put("/admin/:admin_id", mdw, AdminCtrl.updateAdmin)
  .post("/admin/changePassword", AdminCtrl.changePassword);

export default router;
