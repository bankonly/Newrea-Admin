import { Router } from "express";
const router = Router();
const filterCtrl = require("../controllers/filter_controller");

router
  .get("/filter", filterCtrl.getAllfilter)
  .get("/filter/:filter_id", filterCtrl.getfilter)
  .delete("/filter/:filter_id", filterCtrl.deletefilter)
  .put("/filter/:filter_id", filterCtrl.updatefilter)
  .post("/filter", filterCtrl.savefilter);

export default router;