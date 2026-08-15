import { Router, RequestHandler } from "express";
import * as certificateController from "./certificate.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   STUDENT
=========================== */

// Generate Certificate

router.post(
  "/:courseId",
  authenticate,
  authorize("STUDENT"),
  certificateController.generateCertificate as unknown as RequestHandler
);

// My Certificates

router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  certificateController.getMyCertificates as unknown as RequestHandler
);

/* ===========================
   PUBLIC
=========================== */

// Verify Certificate

router.get(
  "/verify/:certificateNumber",
  certificateController.verifyCertificate as unknown as RequestHandler
);


router.get(
  "/:id/download",
  authenticate,
  authorize("STUDENT"),
  certificateController.downloadCertificate as unknown as RequestHandler
);

router.get(
  "/:id/download",
  authenticate,
  authorize("STUDENT"),
  certificateController.downloadCertificate as unknown as RequestHandler
);
export default router;