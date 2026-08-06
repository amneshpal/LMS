import { Router, RequestHandler } from "express";
import * as enrollmentController from "./enrollment.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/*
Admin enroll student
*/

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  enrollmentController.enrollStudent
);

/*
Admin
*/

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  enrollmentController.getAllEnrollments
);

/*
Student
*/

router.get(
  "/my-courses",
  authenticate,
  authorize("STUDENT"),
  enrollmentController.getMyCourses as unknown as RequestHandler
);

/*
Admin
*/

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  enrollmentController.deleteEnrollment
);

export default router;