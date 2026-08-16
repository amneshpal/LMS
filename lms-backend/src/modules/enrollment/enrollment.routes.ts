import {
  Router,
  RequestHandler,
} from "express";

import * as enrollmentController from "./enrollment.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// =========================
// Student Enrollment
// =========================

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  enrollmentController.enrollStudent as unknown as RequestHandler
);

// =========================
// Admin - All Enrollments
// =========================

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  enrollmentController.getAllEnrollments as unknown as RequestHandler
);

// =========================
// Student - My Courses
// =========================

router.get(
  "/my-courses",
  authenticate,
  authorize("STUDENT"),
  enrollmentController.getMyCourses as unknown as RequestHandler
);

// =========================
// Admin - Delete
// =========================

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  enrollmentController.deleteEnrollment as unknown as RequestHandler
);

export default router;