import { Router } from "express";
const router = Router();
const RsCtrl = require("../controllers/reason_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");

const mdw = [AccessPermission];
router
  .get("/reason", RsCtrl.getAllReason)
  .get("/reason/:rs_id", RsCtrl.getReason)
  .delete("/reason/:rs_id", mdw, RsCtrl.deleteReason)
  .put("/reason/:rs_id", mdw, RsCtrl.updateReason)
  .post("/reason", mdw, RsCtrl.saveReason);

export default router;
