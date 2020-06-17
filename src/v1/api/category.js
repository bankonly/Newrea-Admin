import { Router } from "express"

const router = Router()

// Contaller
import { addCategory, get_all_parent_category, get_category_by_id, get_category_by_parent_id } from "./../../controllers/category"

router.post("/addCategory", addCategory)
router.get("/get_all_parent_category", get_all_parent_category)
router.get("/get_category_by_id/:cat_id", get_category_by_id)
router.get("/get_category_by_parent_id/:parent_id", get_category_by_parent_id)

export default router