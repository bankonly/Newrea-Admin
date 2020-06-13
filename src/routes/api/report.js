import { Router } from "express";
const router = Router();

import {
  report_order_complete,
  top_five_product_sold,
  reports,
} from "./../../controllers/report";

router
  .post("/report_order_complete", report_order_complete)
  .get("/top_five_product_sold/:seller_id", top_five_product_sold)
  .get("/reports/:seller_id", reports);

export default router;
