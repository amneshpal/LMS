// import { Router, RequestHandler } from "express";
// import * as assignmentController from "./assignment.controller";

// import { authenticate } from "../../middlewares/auth.middleware";
// import { authorize } from "../../middlewares/role.middleware";

// const router = Router();

// /* ===========================
//    ADMIN / TEACHER
// =========================== */

// // Create Assignment
// router.post(
//   "/",
//   authenticate,
//   authorize("ADMIN", "TEACHER"),
//   assignmentController.createAssignment as unknown as RequestHandler
// );

// // Update Assignment
// router.put(
//   "/:id",
//   authenticate,
//   authorize("ADMIN", "TEACHER"),
//   assignmentController.updateAssignment as unknown as RequestHandler
// );

// // Delete Assignment
// router.delete(
//   "/:id",
//   authenticate,
//   authorize("ADMIN", "TEACHER"),
//   assignmentController.deleteAssignment as unknown as RequestHandler
// );

// // Assignment By Lesson
// router.get(
//   "/lesson/:lessonId",
//   authenticate,
//   assignmentController.getAssignmentsByLesson as unknown as RequestHandler
// );

// // Assignment By Id
// router.get(
//   "/:id",
//   authenticate,
//   assignmentController.getAssignmentById as unknown as RequestHandler
// );

// /* ===========================
//    STUDENT
// =========================== */

// // Submit Assignment
// router.post(
//   "/:assignmentId/submit",
//   authenticate,
//   authorize("STUDENT"),
//   assignmentController.submitAssignment as unknown as RequestHandler
// );

// // My Assignments
// router.get(
//   "/my",
//   authenticate,
//   authorize("STUDENT"),
//   assignmentController.getMyAssignments as unknown as RequestHandler
// );

// // Assignment Result
// router.get(
//   "/:assignmentId/result",
//   authenticate,
//   authorize("STUDENT"),
//   assignmentController.getAssignmentResult as unknown as RequestHandler
// );

// /* ===========================
//    ADMIN / TEACHER
// =========================== */

// // All Submissions
// router.get(
//   "/:assignmentId/submissions",
//   authenticate,
//   authorize("ADMIN", "TEACHER"),
//   assignmentController.getAssignmentSubmissions as unknown as RequestHandler
// );

// // Give Marks & Feedback
// router.patch(
//   "/submission/:submissionId",
//   authenticate,
//   authorize("ADMIN", "TEACHER"),
//   assignmentController.evaluateAssignment as unknown as RequestHandler
// );

// export default router;


import { Router, RequestHandler } from "express";
import * as assignmentController from "./assignment.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   ADMIN / TEACHER
=========================== */

// Create Assignment
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  assignmentController.createAssignment as unknown as RequestHandler
);

// Update Assignment
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  assignmentController.updateAssignment as unknown as RequestHandler
);

// Delete Assignment
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  assignmentController.deleteAssignment as unknown as RequestHandler
);

/* ===========================
   STUDENT
=========================== */

// My Assignments  ✅ BEFORE /:id
router.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  assignmentController.getMyAssignments as unknown as RequestHandler
);

// Submit Assignment
router.post(
  "/:assignmentId/submit",
  authenticate,
  authorize("STUDENT"),
  assignmentController.submitAssignment as unknown as RequestHandler
);

// Assignment Result
router.get(
  "/:assignmentId/result",
  authenticate,
  authorize("STUDENT"),
  assignmentController.getAssignmentResult as unknown as RequestHandler
);

/* ===========================
   COMMON
=========================== */

// Assignment By Lesson
router.get(
  "/lesson/:lessonId",
  authenticate,
  assignmentController.getAssignmentsByLesson as unknown as RequestHandler
);

/* ===========================
   ADMIN / TEACHER
=========================== */

// All Submissions
router.get(
  "/:assignmentId/submissions",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  assignmentController.getAssignmentSubmissions as unknown as RequestHandler
);

// Give Marks & Feedback
router.patch(
  "/submission/:submissionId",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  assignmentController.evaluateAssignment as unknown as RequestHandler
);

/* ===========================
   LAST ROUTE
=========================== */

// Assignment By Id
router.get(
  "/:id",
  authenticate,
  assignmentController.getAssignmentById as unknown as RequestHandler
);

export default router;