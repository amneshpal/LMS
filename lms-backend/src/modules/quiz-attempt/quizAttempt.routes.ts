import { Router, RequestHandler } from "express";

import * as quizAttemptController from "./quizAttempt.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   STUDENT
=========================== */

// Submit Quiz

router.post(
  "/:quizId/submit",
  authenticate,
  authorize("STUDENT"),
  quizAttemptController.submitQuiz as unknown as RequestHandler
);

// Get Quiz Result

router.get(
  "/:quizId/result",
  authenticate,
  authorize("STUDENT"),
  quizAttemptController.getQuizResult as unknown as RequestHandler
);

// Attempt History

router.get(
  "/history",
  authenticate,
  authorize("STUDENT"),
  quizAttemptController.getAttemptHistory as unknown as RequestHandler
);

export default router;