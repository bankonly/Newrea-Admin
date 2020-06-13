import { Router } from "express";
const router = Router();

import {
  add_delivery_free,
  get_delivery_fee_option,
  add_delivery_free_seller,
} from "./../../controllers/delivery_fee_option";

router
  .post("/add_delivery_free", add_delivery_free)
  .post("/add_delivery_free_seller", add_delivery_free_seller)
  .get("/get_delivery_fee_option", get_delivery_fee_option);

export default router;
