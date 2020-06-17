import { Router } from "express";
const router = Router();

import {
  send_notification,
  get_noti_by_array_id,
  get_all_noti,
  delete_noti,
  read_noti,
  ip_address
} from "./../../controllers/notification";

router
  .post("/send_notification", send_notification)
  .post("/get_noti_by_array_id", get_noti_by_array_id)
  .get("/get_all_noti/:user_id", get_all_noti)
  .post("/delete_noti", delete_noti)
  .post("/read_noti", read_noti)
  .get("/ip_address", ip_address);

export default router;
