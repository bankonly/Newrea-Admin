import { Router } from "express"

const router = Router()


import { addProduct, get_allProduct, get_allProduct_by_sellerID, get_Product_byID } from "./../../controllers/product"

router.post("/addProduct", addProduct)
router.get("/get_allProduct", get_allProduct)
router.get("/get_allProduct_by_sellerID/:seller_id", get_allProduct_by_sellerID)
router.get("/get_Product_byID/:pd_id", get_Product_byID)

export default router
