import { Router } from "express";

const router = Router();

import {
  get_all_new_order_by_sellerId,
  get_all_packing_order_by_sellerId,
  get_all_realdy_to_pickup_order_by_sellerId,
  get_all_complete_order_by_sellerId,
  update_packing_order_by_sellerId,
  update_realdy_to_pickup_order_by_sellerId,
  update_cancle_order_by_sellerId,
  get_order_by_seller_and_order_id,
  get_count_order_ready_packing_coplete,
  history_complete_cancel,
  get_order_detail
} from "./../../controllers/order";

router
  .get(
    "/get_all_new_order_by_sellerId/:seller_id",
    get_all_new_order_by_sellerId
  )
  .get(
    "/get_all_packing_order_by_sellerId/:seller_id",
    get_all_packing_order_by_sellerId
  )
  .get(
    "/get_all_realdy_to_pickup_order_by_sellerId/:seller_id",
    get_all_realdy_to_pickup_order_by_sellerId
  )
  .get(
    "/get_all_complete_order_by_sellerId/:seller_id",
    get_all_complete_order_by_sellerId
  )
  .put("/update_packing_order_by_sellerId", update_packing_order_by_sellerId)
  .put(
    "/update_realdy_to_pickup_order_by_sellerId",
    update_realdy_to_pickup_order_by_sellerId
  )
  .put("/update_cancle_order_by_sellerId", update_cancle_order_by_sellerId)
  .post("/get_order_by_seller_and_order_id", get_order_by_seller_and_order_id)
  .get(
    "/get_count_order_ready_packing_coplete/:seller_id",
    get_count_order_ready_packing_coplete
  )
  .get("/history_complete_cancel/:seller_id", history_complete_cancel)
  .post("/get_order_detail", get_order_detail)

export default router;
