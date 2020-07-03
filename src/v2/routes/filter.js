import { Router } from "express";
const router = Router();
const filterCtrl = require("../controllers/filter_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/filter", filterCtrl.getAllfilter)
  .get("/filter/:filter_id", filterCtrl.getfilter)
  .delete("/filter/:filter_id",mdw, filterCtrl.deletefilter)
  .put("/filter/:filter_id",mdw, filterCtrl.updatefilter)
  .post("/filter",mdw, filterCtrl.savefilter);

export default router;