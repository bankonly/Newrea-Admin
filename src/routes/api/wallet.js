import { Router } from "express"
const router = Router()

// Contaller
import { add_wallet, get_all_wallet_by_res_id, delete_wallet, edit_wallet, get_all_bank, get_all_bank_type } from "./../../controllers/wallet"

router.post("/add_wallet", add_wallet)
    .get("/get_all_wallet_by_res_id/:sell_id", get_all_wallet_by_res_id)
    .delete("/delete_wallet/:wallet_id", delete_wallet)
    .put("/edit_wallet", edit_wallet)
    .get("/get_all_bank", get_all_bank)
    .get("/get_all_bank_type", get_all_bank_type)

export default router