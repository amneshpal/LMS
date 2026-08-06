import { Router, RequestHandler } from "express";
import * as adminController from "./admin.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   ADMIN
=========================== */

router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  adminController.getDashboard as unknown as RequestHandler
);

export default router;