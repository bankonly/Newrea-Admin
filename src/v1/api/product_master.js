import { Router } from 'express'

const router = Router()

import { addProduct_master, get_products_master_by_cat_id, get_products_master_by_pd_master_id } from './../../controllers/product_master'

router.post("/add_product_master", addProduct_master)
router.get("/get_products_master_by_pd_master_id/:pd_master_id", get_products_master_by_pd_master_id)
router.get("/get_products_master_by_cat_id/:cat_id", get_products_master_by_cat_id)

export default router