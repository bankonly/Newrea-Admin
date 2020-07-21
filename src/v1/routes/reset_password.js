const router = require("express").Router();
const userCtrl = require("../controllers/user_controller");


router
  // user_controller
  .post("/user/verifyOtp", userCtrl.verifyOtp)
  .post("/user/registerNewPassword", userCtrl.registerNewPassword);

export default router;
