import { Router, RequestHandler } from "express";
import * as teacherDashboardController from "./teacherDashboard.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   TEACHER DASHBOARD
=========================== */

// Dashboard Overview
router.get(
  "/",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherDashboard as unknown as RequestHandler
);

// My Courses
router.get(
  "/courses",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherCourses as unknown as RequestHandler
);

// My Students
router.get(
  "/students",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherStudents as unknown as RequestHandler
);

// My Assignments
router.get(
  "/assignments",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherAssignments as unknown as RequestHandler
);

// My Quizzes
router.get(
  "/quizzes",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherQuizzes as unknown as RequestHandler
);

// My Reviews
router.get(
  "/reviews",
  authenticate,
  authorize("TEACHER"),
  teacherDashboardController.getTeacherReviews as unknown as RequestHandler
);

export default router;