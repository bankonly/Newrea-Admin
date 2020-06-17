import { Router } from "express";
const router = Router();

// Contaller
import { get_all_cancel_reason } from "./../../controllers/cancel_reason";

router.get("/get_all_cancel_reason", get_all_cancel_reason);

export default router;
