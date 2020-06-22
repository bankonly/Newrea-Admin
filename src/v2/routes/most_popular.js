const { Router } = require("express");
const router = Router();
const MostCtrl = require("../controllers/most_popular_controller");

router
  .get("/mostPopular", MostCtrl.getAllMostPopular)
  .get("/mostPopular/:mos_id", MostCtrl.getMostPopular)
  .delete("/mostPopular/:mos_id", MostCtrl.deleteMostPopular)
  .put("/mostPopular/:mos_id", MostCtrl.updateMostPopular)
  .post("/mostPopular", MostCtrl.saveMostPopular);

export default router;
