import { Router } from "express";
const router = Router();

/** Controllers */
import {
  createNewAccessPolicy,
  getAccessPolicy,
  getAllAccessPolicy,
  updateAccessPolicy,
  deleteAccessPolicy,
  getMyAccessPolicy
} from "../controllers/access_policy_controller";

/** define routes */
router
  .get("/accessPolicy", getAllAccessPolicy)
  .get("/accessPolicy/me", getMyAccessPolicy)
  .get("/accessPolicy/:accp_id", getAccessPolicy)
  .delete("/accessPolicy/:accp_id", deleteAccessPolicy)
  .put("/accessPolicy/:accp_id", updateAccessPolicy)
  .post("/accessPolicy", createNewAccessPolicy);

export default router;
