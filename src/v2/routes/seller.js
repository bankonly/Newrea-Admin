const express = require("express");

const router = express.Router();

const sellerController = require("./../controllers/seller_controller");

router.post("/seller/lists", sellerController.getSellerList);
router.post("/seller/:sellerID", sellerController.findSellerByID);
router.post("/seller/createSeller", sellerController.createSeller);
router.post("/sellerLogin", sellerController.sellerLogin);
// router.put("/seller/disable/:sellerID", sellerController.disableSeller);
// router.put("/seller/updateSeller/:sellerID", sellerController.editSeller);

module.exports = router;
