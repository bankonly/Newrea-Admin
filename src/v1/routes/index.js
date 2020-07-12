const router = require("express").Router();
const userCtrl = require("../controllers/user_controller");

router.get("/welcome", (req, res) => res.send("Welocme to lamo"));

// user_controller
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

export default router;
