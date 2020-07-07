const { Router } = require("express");
const router = Router();
const AccCtrl = require("../controllers/access_policy_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/accessPolicy",mdw, AccCtrl.getAllAccessPolicy)
  .get("/accessPolicy/me", AccCtrl.getMyAccessPolicy)
  .get("/accessPolicy/:accp_id",mdw, AccCtrl.getAccessPolicy)
  .delete("/accessPolicy/:accp_id",mdw, AccCtrl.deleteAccessPolicy)
  .put("/accessPolicy/:accp_id",mdw, AccCtrl.updateAccessPolicy)
  .post("/accessPolicy",mdw, AccCtrl.createNewAccessPolicy);

export default router;
