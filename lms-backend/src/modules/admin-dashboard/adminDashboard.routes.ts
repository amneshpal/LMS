import { Router, RequestHandler } from "express";
import * as adminDashboardController from "./adminDashboard.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   ADMIN DASHBOARD
=========================== */

// Dashboard Overview
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getDashboardOverview as unknown as RequestHandler
);

// Recent Students
router.get(
  "/recent-students",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getRecentStudents as unknown as RequestHandler
);

// Recent Payments
router.get(
  "/recent-payments",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getRecentPayments as unknown as RequestHandler
);

// Recent Enrollments
router.get(
  "/recent-enrollments",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getRecentEnrollments as unknown as RequestHandler
);

// Recent Reviews
router.get(
  "/recent-reviews",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getRecentReviews as unknown as RequestHandler
);

// Top Selling Courses
router.get(
  "/top-courses",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getTopSellingCourses as unknown as RequestHandler
);

// Top Rated Courses
router.get(
  "/top-rated",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getTopRatedCourses as unknown as RequestHandler
);

// Revenue Analytics
router.get(
  "/revenue",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getRevenueAnalytics as unknown as RequestHandler
);

// Enrollment Analytics
router.get(
  "/enrollments",
  authenticate,
  authorize("ADMIN"),
  adminDashboardController.getEnrollmentAnalytics as unknown as RequestHandler
);

export default router;