import Res from "../controllers/response_controller";
import {
  getAdminList,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  changePassword
} from "../controllers/admin_controller";

import { Router } from "express";
const router = Router();

router
  .get("/admin", getAdminList)
  .get("/admin/:admin_id", getAdminById)
  .delete("/admin/:admin_id", deleteAdmin)
  .put("/admin/:admin_id", updateAdmin)
  .post("/admin/changePassword", changePassword);

export default router;
