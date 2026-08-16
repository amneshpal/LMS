import { Request, Response } from "express";
import * as enrollmentService from "./enrollment.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const enrollStudent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const enrollment =
      await enrollmentService.enrollStudent({
        studentId: req.user.id,
        courseId: req.body.courseId,
      });

    return res.status(201).json({
      success: true,
      message: "Student enrolled successfully",
      data: enrollment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEnrollments = async (
  req: Request,
  res: Response
) => {
  try {
    const enrollments =
      await enrollmentService.getAllEnrollments();

    return res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCourses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const courses =
      await enrollmentService.getStudentCourses(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEnrollment = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const result =
      await enrollmentService.deleteEnrollment(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};