const { Router } = require("express");
const router = Router();
const AdminCtrl = require("../controllers/admin_controller");

router
  .get("/admin/me", AdminCtrl.whoami)
  .get("/admin", AdminCtrl.getAdminList)
  .get("/admin/:admin_id", AdminCtrl.getAdminById)
  .delete("/admin/:admin_id", AdminCtrl.deleteAdmin)
  .put("/admin/:admin_id", AdminCtrl.updateAdmin)
  .post("/admin/changePassword", AdminCtrl.changePassword);

export default router;
