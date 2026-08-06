import { Router, RequestHandler } from "express";
import * as userManagementController from "./userManagement.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   ADMIN
=========================== */

// Get All Users
router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  userManagementController.getAllUsers as unknown as RequestHandler
);

// Get User By Id
router.get(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  userManagementController.getUserById as unknown as RequestHandler
);

// Update User Status
router.patch(
  "/users/:id/status",
  authenticate,
  authorize("ADMIN"),
  userManagementController.updateUserStatus as unknown as RequestHandler
);

// Update User Role
router.patch(
  "/users/:id/role",
  authenticate,
  authorize("ADMIN"),
  userManagementController.updateUserRole as unknown as RequestHandler
);

// Delete User
router.delete(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  userManagementController.deleteUser as unknown as RequestHandler
);

export default router;