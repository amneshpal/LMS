import { Router, RequestHandler } from "express";
import * as reviewController from "./review.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   STUDENT
=========================== */

// Create Review

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  reviewController.createReview as unknown as RequestHandler
);

// Update Review

router.put(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  reviewController.updateReview as unknown as RequestHandler
);

// Delete Review

router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  reviewController.deleteReview as unknown as RequestHandler
);

/* ===========================
   PUBLIC
=========================== */

// Get Reviews of Course

router.get(
  "/course/:courseId",
  reviewController.getReviewsByCourse as unknown as RequestHandler
);

export default router;