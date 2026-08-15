import { Request, Response } from "express";
import * as assignmentService from "./assignment.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

/* ===========================
   Helper
=========================== */

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

/* ===========================
   Create Assignment
=========================== */

export const createAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const assignment =
      await assignmentService.createAssignment(req.body);

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Assignments By Lesson
=========================== */

export const getAssignmentsByLesson = async (
  req: Request,
  res: Response
) => {
  try {
    const assignments =
      await assignmentService.getAssignmentsByLesson(
        getParamValue(req.params.lessonId)
      );

    return res.json({
      success: true,
      data: assignments,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Assignment By Id
=========================== */

export const getAssignmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const assignment =
      await assignmentService.getAssignmentById(
        getParamValue(req.params.id)
      );

    return res.json({
      success: true,
      data: assignment,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Update Assignment
=========================== */

export const updateAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const assignment =
      await assignmentService.updateAssignment(
        getParamValue(req.params.id),
        req.body
      );

    return res.json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Delete Assignment
=========================== */

export const deleteAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await assignmentService.deleteAssignment(
        getParamValue(req.params.id)
      );

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Submit Assignment
=========================== */

export const submitAssignment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const submission =
      await assignmentService.submitAssignment({
        assignmentId: getParamValue(req.params.assignmentId),
        studentId: req.user.id,
        fileUrl: req.body.fileUrl,
        remarks: req.body.remarks,
      });

    return res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      data: submission,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   My Assignments
=========================== */

export const getMyAssignments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const assignments =
      await assignmentService.getMyAssignments(
        req.user.id
      );

    return res.json({
      success: true,
      data: assignments,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Assignment Result
=========================== */

export const getAssignmentResult = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result =
      await assignmentService.getAssignmentResult(
        getParamValue(req.params.assignmentId),
        req.user.id
      );

    return res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get All Submissions
=========================== */

export const getAssignmentSubmissions = async (
  req: Request,
  res: Response
) => {
  try {
    const submissions =
      await assignmentService.getAssignmentSubmissions(
        getParamValue(req.params.assignmentId)
      );

    return res.json({
      success: true,
      data: submissions,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Give Marks & Feedback
=========================== */

export const evaluateAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const submission =
      await assignmentService.evaluateAssignment({
        submissionId: getParamValue(req.params.submissionId),
        marks: req.body.marks,
        feedback: req.body.feedback,
      });

    return res.json({
      success: true,
      message: "Assignment evaluated successfully",
      data: submission,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};