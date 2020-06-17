import { Router } from "express";
import path from "path";
const router = Router();
import passport from "passport";

import {
  seller_register,
  get_allSeller,
  sell_login,
  seller,
  editProfile,
  changPassword,
  updateSellerSatatus,
  update_seller_online,
  test,
} from "./../../controllers/sellers";

// add Seller
router.post("/seller_register", seller_register);
router.post("/sell_login", sell_login);
router.post("/editProfile", editProfile);
router.post("/changPassword", changPassword);
router.post("/updateSellerSatatus", updateSellerSatatus);
router.get("/seller", passport.authenticate("jwt", { session: false }), seller);
router.get("/get_allSeller", get_allSeller);
router.get("/test", test);
router.post("/update_seller_online", update_seller_online);

router.get("/image/:img", (req, res) => {
  res.sendFile(
    path.join(__dirname + "./../../../../img/seller_img/logo/" + req.params.img)
  );
});

export default router;
