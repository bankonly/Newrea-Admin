import { Router } from "express";
const router = Router();


import {
    add_flash_deal,
    get_flash_deal_by_seller_id,
    delete_flash_deal_by_id,
    edit_flash_deal_by_id,
    get_product_by_pd_id_array,
    get_product_flash_deal_by_seller_id
} from "./../../controllers/flash_deal";

router
    .post("/add_flash_deal", add_flash_deal)
    .get("/get_flash_deal_by_seller_id/:seller_id", get_flash_deal_by_seller_id)
    .delete("/delete_flash_deal_by_id/:id", delete_flash_deal_by_id)
    .put("/edit_flash_deal_by_id", edit_flash_deal_by_id)
    .post("/get_product_by_pd_id_array", get_product_by_pd_id_array)
    .get("/get_product_flash_deal_by_seller_id/:seller_id", get_product_flash_deal_by_seller_id)
export default router;