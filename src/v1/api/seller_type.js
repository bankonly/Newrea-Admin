const express = require("express")
const router = express.Router()

const seller_typeRouter = require("./../../controllers/seller_types")


router.post("/addSeller_Type", seller_typeRouter.addSeller_Type)
router.get("/getAllSeller_Type", seller_typeRouter.getAllSeller_type)
router.put("/editSeller_type/:st_id", seller_typeRouter.editSeller_type)

module.exports = router