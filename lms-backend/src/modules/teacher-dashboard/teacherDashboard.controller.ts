import { Request, Response } from "express";
import * as teacherDashboardService from "./teacherDashboard.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

/* ===========================
   Teacher Dashboard Overview
=========================== */

export const getTeacherDashboard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const dashboard =
      await teacherDashboardService.getTeacherDashboard(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Teacher Courses
=========================== */

export const getTeacherCourses = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const courses =
      await teacherDashboardService.getTeacherCourses(
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

/* ===========================
   Teacher Students
=========================== */

export const getTeacherStudents = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const students =
      await teacherDashboardService.getTeacherStudents(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Teacher Assignments
=========================== */

export const getTeacherAssignments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const assignments =
      await teacherDashboardService.getTeacherAssignments(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Teacher Quizzes
=========================== */

export const getTeacherQuizzes = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const quizzes =
      await teacherDashboardService.getTeacherQuizzes(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: quizzes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};

/* ===========================
   Teacher Reviews
=========================== */

export const getTeacherReviews = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const reviews =
      await teacherDashboardService.getTeacherReviews(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};