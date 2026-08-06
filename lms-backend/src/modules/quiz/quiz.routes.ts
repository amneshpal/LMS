import { Router, RequestHandler } from "express";

import * as quizController from "./quiz.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   ADMIN
=========================== */

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  quizController.createQuiz as unknown as RequestHandler
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  quizController.deleteQuiz as unknown as RequestHandler
);

/* ===========================
   STUDENT
=========================== */

router.get(
  "/lesson/:lessonId",
  authenticate,
  authorize("STUDENT"),
  quizController.getQuizByLesson as unknown as RequestHandler
);

export default router;