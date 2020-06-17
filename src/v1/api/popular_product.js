import { Router } from "express";
const router = Router();

import {
    get_all_popula_product_by_seller_id
} from "./../../controllers/popular_product";

router
    .get("/get_all_popula_product_by_seller_id/:seller_id", get_all_popula_product_by_seller_id)


export default router;