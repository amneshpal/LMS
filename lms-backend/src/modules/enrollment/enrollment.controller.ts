import { Request, Response } from "express";
import * as enrollmentService from "./enrollment.service";

export const enrollStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const enrollment = await enrollmentService.enrollStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student enrolled successfully",
      data: enrollment,
    });
  } catch (error: any) {
    res.status(400).json({
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

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCourses = async (
  req: Request & { user: { id: string } },
  res: Response
) => {
  try {
    const studentId = req.user.id;

    const courses =
      await enrollmentService.getStudentCourses(studentId);

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
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

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};