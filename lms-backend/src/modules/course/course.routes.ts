// import { Router } from "express";
// import * as courseController from "./course.controller";
// import { authenticate } from "../../middlewares/auth.middleware";
// import { authorize } from "../../middlewares/role.middleware";

// const router = Router();

// // Public Routes
// router.get("/", courseController.getAllCourses);
// router.get("/details/:slug", courseController.getCourseDetails);
// router.get("/:slug", courseController.getCourseBySlug);

// // Admin Routes
// router.post(
//   "/",
//   authenticate,
//   authorize("ADMIN"),
//   courseController.createCourse
// );

// router.put(
//   "/:id",
//   authenticate,
//   authorize("ADMIN"),
//   courseController.updateCourse
// );

// router.delete(
//   "/:id",
//   authenticate,
//   authorize("ADMIN"),
//   courseController.deleteCourse
// );


// router.get(
//   "/details/:slug",
//   courseController.getCourseDetails
// ); 
// export default router;


import { Router, RequestHandler } from "express";
import * as courseController from "./course.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   PUBLIC ROUTES
=========================== */

// All Courses
router.get(
  "/",
  courseController.getAllCourses
);

// Course Details
router.get(
  "/details/:slug",
  courseController.getCourseDetails
);

// Course By Slug
router.get(
  "/:slug",
  courseController.getCourseBySlug
);

/* ===========================
   ADMIN / TEACHER
=========================== */

// Create Course
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  courseController.createCourse as unknown as RequestHandler
);

// Update Course
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  courseController.updateCourse as unknown as RequestHandler
);

// Delete Course
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  courseController.deleteCourse as unknown as RequestHandler
);

export default router;