import { Router, RequestHandler } from "express";

import * as studentController from "./student.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* =========================
   STUDENT DASHBOARD
========================= */

router.get(
  "/dashboard",
  authenticate,
  authorize("STUDENT"),
  studentController.getDashboard as unknown as RequestHandler
);

/* =========================
   MY COURSES
========================= */

router.get(
  "/my-courses",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyCourses as unknown as RequestHandler
);

/* =========================
   MY COURSE DETAILS
========================= */

router.get(
  "/my-course/:courseId",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyCourse as unknown as RequestHandler
);

/* =========================
   COURSE PROGRESS
========================= */

router.get(
  "/course-progress/:courseId",
  authenticate,
  authorize("STUDENT"),
  studentController.getCourseProgress as unknown as RequestHandler
);

/* =========================
   CONTINUE LEARNING
========================= */

router.get(
  "/continue-learning",
  authenticate,
  authorize("STUDENT"),
  studentController.getContinueLearning as unknown as RequestHandler
);

/* =========================
   COMPLETED COURSES
========================= */

router.get(
  "/completed-courses",
  authenticate,
  authorize("STUDENT"),
  studentController.getCompletedCourses as unknown as RequestHandler
);

export default router;