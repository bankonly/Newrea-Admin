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
  .post("/getMostPopular", getMostPopular)
  .post("/deleteMostPopular", deleteMostPopular)
  .post("/updateMostPopular/:mos_id", updateMostPopular)
  .post("/addMostPopular", saveMostPopular);

export default router;
