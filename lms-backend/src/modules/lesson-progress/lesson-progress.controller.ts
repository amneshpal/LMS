import { Response } from "express";

import * as progressService
  from "./lesson-progress.service";

import { AuthRequest } from "../../middlewares/auth.middleware";

// ==========================================
// Get Lesson Progress
// ==========================================

export const getLessonProgress = async (
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

    const lessonId =
      Array.isArray(req.params.lessonId)
        ? req.params.lessonId[0]
        : req.params.lessonId;

    const progress =
      await progressService.getLessonProgress(
        req.user.id,
        lessonId
      );

    return res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Progress
// ==========================================

export const updateLessonProgress = async (
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

    const lessonId =
      Array.isArray(req.params.lessonId)
        ? req.params.lessonId[0]
        : req.params.lessonId;

    const progress =
      await progressService.updateLessonProgress(
        req.user.id,
        lessonId,
        {
          watchedSeconds:
            req.body.watchedSeconds,

          completed:
            req.body.completed,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Lesson progress updated",
      data: progress,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Mark Complete
// ==========================================

export const completeLesson = async (
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

    const lessonId =
      Array.isArray(req.params.lessonId)
        ? req.params.lessonId[0]
        : req.params.lessonId;

    const progress =
      await progressService.completeLesson(
        req.user.id,
        lessonId
      );

    return res.status(200).json({
      success: true,
      message: "Lesson completed successfully",
      data: progress,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Course Progress Details
// ==========================================

export const getCourseLessonProgress =
  async (
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

      const courseId =
        Array.isArray(req.params.courseId)
          ? req.params.courseId[0]
          : req.params.courseId;

      const progress =
        await progressService.getCourseLessonProgress(
          req.user.id,
          courseId
        );

      return res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };