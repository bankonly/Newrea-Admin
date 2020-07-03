import { Router } from "express";
const router = Router();
const DashboardCtrl = require("../controllers/dashboard_controller");

router
  .get("/dashboard", DashboardCtrl.dashboard)

export default router;