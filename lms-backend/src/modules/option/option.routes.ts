import { Router, RequestHandler } from "express";
import * as optionController from "./option.controller";

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
  optionController.createOption as unknown as RequestHandler
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  optionController.updateOption as unknown as RequestHandler
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  optionController.deleteOption as unknown as RequestHandler
);

/* ===========================
   STUDENT
=========================== */

router.get(
  "/question/:questionId",
  authenticate,
  authorize("STUDENT"),
  optionController.getOptionsByQuestion as unknown as RequestHandler
);

export default router;