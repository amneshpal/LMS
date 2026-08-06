import { Router } from "express";
import * as sectionController from "./section.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  sectionController.createSection
);

router.get(
  "/course/:courseId",
  sectionController.getSectionsByCourse
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  sectionController.updateSection
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  sectionController.deleteSection
);

export default router;