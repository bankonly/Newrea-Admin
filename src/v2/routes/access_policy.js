const { Router } = require("express");
const router = Router();
const AccCtrl = require("../controllers/access_policy_controller");

router
  .get("/accessPolicy", AccCtrl.getAllAccessPolicy)
  .get("/accessPolicy/me", AccCtrl.getMyAccessPolicy)
  .get("/accessPolicy/:accp_id", AccCtrl.getAccessPolicy)
  .delete("/accessPolicy/:accp_id", AccCtrl.deleteAccessPolicy)
  .put("/accessPolicy/:accp_id", AccCtrl.updateAccessPolicy)
  .post("/accessPolicy", AccCtrl.createNewAccessPolicy);

export default router;
