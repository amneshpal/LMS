import { Request, Response } from "express";

import * as studentService from "./student.service";

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    };
}


export const getDashboard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const data = await studentService.getDashboard(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCourses = async (

    req: AuthenticatedRequest,

    res: Response

) => {

    try {

        const studentId = req.user.id;

        const courses =
            await studentService.getMyCourses(studentId);

        return res.status(200).json({

            success: true,

            data: courses

        });

    }

    catch (error: any) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const getMyCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const studentId = req.user.id;

    const courseId = Array.isArray(req.params.courseId)
      ? req.params.courseId[0]
      : req.params.courseId;

    const course = await studentService.getMyCourse(
      studentId,
      courseId
    );

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCourseProgress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const studentId = req.user.id;

    const courseId = req.params.courseId as string;

    const data =
      await studentService.getCourseProgress(
        studentId,
        courseId
      );

    return res.json({
      success: true,
      data,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getContinueLearning = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const data =
      await studentService.getContinueLearning(req.user.id);

    return res.json({

      success: true,

      data,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const getCompletedCourses = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const data =
      await studentService.getCompletedCourses(req.user.id);

    return res.json({

      success: true,

      data,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};