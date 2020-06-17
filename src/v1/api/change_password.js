import { Router } from "express"

const router = Router()

// Contaller
import { get_change_password } from "./../../controllers/change_password"

router.get("/get_change_password/:seller_id", get_change_password)


export default router