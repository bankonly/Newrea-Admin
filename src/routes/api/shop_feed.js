import { Router } from "express";
const router = Router();


import { add_shop_feed, get_all_feed_by_seller_id, delete_feed_by_id, edit_shop_feed } from "./../../controllers/shop_feed";

router
    .post("/add_shop_feed", add_shop_feed)
    .get("/get_all_feed_by_seller_id/:seller_id", get_all_feed_by_seller_id)
    .delete("/delete_feed_by_id/:id", delete_feed_by_id)
    .put("/edit_shop_feed", edit_shop_feed)

export default router;