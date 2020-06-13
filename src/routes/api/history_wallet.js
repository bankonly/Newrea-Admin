import { Router } from "express";
const router = Router();

// Contaller
import { get_all_history_wallet } from "./../../controllers/history_wallet";

router.get("/get_all_history_wallet/:seller_id", get_all_history_wallet);

export default router;
