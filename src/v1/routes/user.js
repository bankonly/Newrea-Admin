const router = require("express").Router();
const userCtrl = require("../controllers/user_controller");

router
  .post("/user/me", userCtrl.me)
  .post("/user/changePassword", userCtrl.changePassword);

export default router;
