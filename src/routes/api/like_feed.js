import { Router } from "express"
const router = Router()

// Contaller
import { get_like_by_shop_feed_id } from "./../../controllers/like_feed"

router
    .get("/get_like_by_shop_feed_id/:shop_feed_id", get_like_by_shop_feed_id)

export default router