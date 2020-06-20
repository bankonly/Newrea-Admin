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
  .post("/getAllMostPopular", getAllMostPopular)
  .post("/getMostPopular/:mos_id", getMostPopular)
  .post("/delMostPopular/:mos_id", deleteMostPopular)
  .post("/updateMostPopular/:mos_id", updateMostPopular)
  .post("/addMostPopular", saveMostPopular);

export default router;
