import { Router } from "express"
const router = Router()

// Contaller
import { add_bank } from "./../../controllers/bank"

router.post("/add_bank", add_bank)

export default router