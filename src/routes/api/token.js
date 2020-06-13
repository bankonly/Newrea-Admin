import { Router } from "express";
const router = Router();

import {
  addtoken,
  get_all_by_user_type,
  delete_token
} from "./../../controllers/token";

router
  .post("/addtoken", addtoken)
  .get("/get_all_by_user_type", get_all_by_user_type)
  .delete("/delete_token", delete_token);

export default router;
