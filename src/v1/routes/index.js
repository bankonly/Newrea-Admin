const router = require("express").Router();
const userCtrl = require("../controllers/user_controller");

router.get("/welcome", (req, res) => res.send("Welocme to lamo"));

router
  // user_controller
  .post("/register", userCtrl.register)
  .post("/login", userCtrl.login)
  .post("/user/resetPassword", userCtrl.resetPassword);

export default router;
