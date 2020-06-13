import { Router } from "express";
const router = Router();

import {
    get_follower_like_comment
} from "./../../controllers/follower_like_comment";

router
    .get("/get_follower_like_comment/:seller_id", get_follower_like_comment)


export default router;