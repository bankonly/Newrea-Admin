import { Router } from "express"
const router = Router()

// Contaller
import { get_comment_by_shop_feed_id } from "./../../controllers/comment_feed"

router
    .get("/get_comment_by_shop_feed_id/:shop_feed_id", get_comment_by_shop_feed_id)

export default router