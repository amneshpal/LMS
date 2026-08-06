import { Router, RequestHandler } from "express";

import * as questionController from "./question.controller";

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
  questionController.createQuestion as unknown as RequestHandler
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  questionController.updateQuestion as unknown as RequestHandler
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  questionController.deleteQuestion as unknown as RequestHandler
);

/* ===========================
   STUDENT
=========================== */

router.get(
  "/quiz/:quizId",
  authenticate,
  authorize("ADMIN", "STUDENT"),
  questionController.getQuestionsByQuiz as unknown as RequestHandler
);

export default router;