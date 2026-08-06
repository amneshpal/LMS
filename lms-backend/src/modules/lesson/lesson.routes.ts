// import { Router } from "express";
// import * as lessonController from "./lesson.controller";
// import { authenticate } from "../../middlewares/auth.middleware";
// import { authorize } from "../../middlewares/role.middleware";

// const router = Router();

// router.post(
//   "/",
//   authenticate,
//   authorize("ADMIN"),
//   lessonController.createLesson
// );

// router.get(
//   "/section/:sectionId",
//   lessonController.getLessonsBySection
// );

// router.get(
//   "/:id",
//   lessonController.getLessonById
// );

// router.put(
//   "/:id",
//   authenticate,
//   authorize("ADMIN"),
//   lessonController.updateLesson
// );

// router.delete(
//   "/:id",
//   authenticate,
//   authorize("ADMIN"),
//   lessonController.deleteLesson
// );

// export default router;



import { Router } from "express";
import * as lessonController from "./lesson.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { canAccessLesson } from "../../middlewares/canAccessLesson";

const router = Router();

/* ============================================================
   Admin Routes
============================================================ */

// Create Lesson
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  lessonController.createLesson
);

// Update Lesson
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  lessonController.updateLesson
);

// Delete Lesson
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  lessonController.deleteLesson
);

/* ============================================================
   Public Routes
============================================================ */

// Get All Lessons of a Section
router.get(
  "/section/:sectionId",
  lessonController.getLessonsBySection
);

/*
  Get Single Lesson

  Logic:

  Preview Lesson  -> Anyone can access

  Paid Lesson -> Only
      Admin
      Teacher
      Enrolled Student
*/
router.get(
  "/:id",
  canAccessLesson,
  lessonController.getLessonById
);

export default router;