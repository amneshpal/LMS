import { Router } from "express";
import * as courseController from "./course.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Public Routes
router.get("/", courseController.getAllCourses);
router.get("/details/:slug", courseController.getCourseDetails);
router.get("/:slug", courseController.getCourseBySlug);

// Admin Routes
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  courseController.createCourse
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  courseController.deleteCourse
);


router.get(
  "/details/:slug",
  courseController.getCourseDetails
); 
export default router;