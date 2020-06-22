import { Router } from "express";
const router = Router();

/** Controllers */
import {
  saveMostPopular,
  updateMostPopular,
  deleteMostPopular,
  getAllMostPopular,
  getMostPopular,
} from "../controllers/most_popular_controller";

/** define routes */
router
  .get("/mostPopular", getAllMostPopular)
  .get("/mostPopular/:mos_id", getMostPopular)
  .delete("/mostPopular/:mos_id", deleteMostPopular)
  .put("/mostPopular/:mos_id", updateMostPopular)
  .post("/mostPopular", saveMostPopular);

export default router;
