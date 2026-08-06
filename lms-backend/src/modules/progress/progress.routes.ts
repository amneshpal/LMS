import { Router } from "express";
import * as progressController from "./progress.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Student Progress
|--------------------------------------------------------------------------
*/

// Save Progress
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  (req, res, next) => {
    Promise.resolve(progressController.saveProgress(req as any, res as any)).catch(
      next
    );
  }
);

// Get Progress of One Lesson
router.get(
  "/:lessonId",
  authenticate,
  authorize("STUDENT"),
  (req, res, next) => {
    Promise.resolve(progressController.getLessonProgress(req as any, res as any)).catch(next);
  }
);

export default router;