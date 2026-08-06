import { Router, RequestHandler } from "express";
import * as paymentController from "./payment.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   STUDENT
=========================== */

// Create Payment Request

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  paymentController.createPayment as unknown as RequestHandler
);

// My Payments

router.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  paymentController.getMyPayments as unknown as RequestHandler
);

/* ===========================
   ADMIN
=========================== */

// Pending Payments

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  paymentController.getPendingPayments as unknown as RequestHandler
);

// Approve Payment

router.patch(
  "/:id/approve",
  authenticate,
  authorize("ADMIN"),
  paymentController.approvePayment as unknown as RequestHandler
);

// Reject Payment

router.patch(
  "/:id/reject",
  authenticate,
  authorize("ADMIN"),
  paymentController.rejectPayment as unknown as RequestHandler
);

export default router;