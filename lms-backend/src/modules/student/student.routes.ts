import { Router, RequestHandler } from "express";

import * as studentController from "./student.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get(

    "/my-courses",

    authenticate,

    authorize("STUDENT"),

    studentController.getMyCourses as unknown as RequestHandler

);

router.get(
  "/my-course/:courseId",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyCourse as unknown as RequestHandler
);



router.get(
  "/course-progress/:courseId",
  authenticate,
  authorize("STUDENT"),
  studentController.getCourseProgress as unknown as RequestHandler
);


router.get(
  "/continue-learning",
  authenticate,
  authorize("STUDENT"),
  studentController.getContinueLearning as unknown as RequestHandler
);

router.get(
  "/completed-courses",
  authenticate,
  authorize("STUDENT"),
  studentController.getCompletedCourses as unknown as RequestHandler
);
export default router;