import {
  Router,
  RequestHandler,
} from "express";

import * as progressController
  from "./lesson-progress.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// ==========================================
// Get Single Lesson Progress
// ==========================================

router.get(
  "/lesson/:lessonId",
  authenticate,
  authorize("STUDENT"),
  progressController.getLessonProgress as unknown as RequestHandler
);

// ==========================================
// Update Watched Progress
// ==========================================

router.put(
  "/lesson/:lessonId",
  authenticate,
  authorize("STUDENT"),
  progressController.updateLessonProgress as unknown as RequestHandler
);

// ==========================================
// Mark Complete
// ==========================================

router.post(
  "/lesson/:lessonId/complete",
  authenticate,
  authorize("STUDENT"),
  progressController.completeLesson as unknown as RequestHandler
);

// ==========================================
// Get Course Lesson Progress
// ==========================================

router.get(
  "/course/:courseId",
  authenticate,
  authorize("STUDENT"),
  progressController.getCourseLessonProgress as unknown as RequestHandler
);

export default router;