import { Router } from "express"

const router = Router()

import {
    add_promo_code,
    get_all_promo_code_by_sell_id,
    get_all_promo_code_discount_by_sell_id,
    get_all_promo_code_sku_by_sell_id,
    delete_promo_code_by_id,
    edit_promo_code
} from "./../../controllers/promo_code"

router
    .post("/add_promo_code", add_promo_code)
    .get("/get_all_promo_code_by_sell_id/:seller_id", get_all_promo_code_by_sell_id)
    .get("/get_all_promo_code_discount_by_sell_id/:seller_id", get_all_promo_code_discount_by_sell_id)
    .get("/get_all_promo_code_sku_by_sell_id/:seller_id", get_all_promo_code_sku_by_sell_id)
    .delete("/delete_promo_code_by_id/:promo_id", delete_promo_code_by_id)
    .put("/edit_promo_code", edit_promo_code)

export default router