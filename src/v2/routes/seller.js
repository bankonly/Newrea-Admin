const express = require("express");

const router = express.Router();

const sellerController = require("./../controllers/seller_controller");

router.post("/seller/lists", sellerController.getSellerList);
router.post("/seller/findSeller/:sellerID", sellerController.findSellerByID);
router.post("/seller/createSeller", sellerController.createSeller);
router.put("/seller/disableSeller/:sellerID", sellerController.disableSeller);
router.put("/seller/updateSeller/:sellerID", sellerController.updateSeller);

module.exports = router;
