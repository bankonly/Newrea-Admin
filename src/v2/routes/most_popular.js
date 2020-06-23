const { Router } = require("express");
const router = Router();
const MostCtrl = require("../controllers/most_popular_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/mostPopular", MostCtrl.getAllMostPopular)
  .get("/mostPopular/:mos_id", MostCtrl.getMostPopular)
  .delete("/mostPopular/:mos_id", mdw, MostCtrl.deleteMostPopular)
  .put("/mostPopular/:mos_id", mdw, MostCtrl.updateMostPopular)
  .post("/mostPopular", mdw, MostCtrl.saveMostPopular);

export default router;
