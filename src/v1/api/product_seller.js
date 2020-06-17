import { Router } from 'express'

const router = Router()

import {
    addProductSeller,
    get_all_product_by_sell_id,
    delete_product, get_product_by_pd_sell_id,
    edit_pd_by_pd_seller_id_no_option,
    edit_pd_by_pd_seller_id_has_option,
    search_produc,
    get_product_for_set_flash_deal
} from './../../controllers/product_seller'

router.post("/add_product_seller", addProductSeller)
    .get("/get_all_product_by_sell_id/:seller_id", get_all_product_by_sell_id)
    .get("/get_product_by_pd_sell_id/:pd_sell_id", get_product_by_pd_sell_id)
    .delete("/delete_product/:pd_seller_id", delete_product)
    .post("/edit_pd_by_pd_seller_id_no_option", edit_pd_by_pd_seller_id_no_option)
    .post("/edit_pd_by_pd_seller_id_has_option", edit_pd_by_pd_seller_id_has_option)
    .post("/search_produc", search_produc)
    .post("/get_product_for_set_flash_deal", get_product_for_set_flash_deal)

export default router