import { Request, Response } from "express";
import * as progressService from "./progress.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string | number;
  };
}

/* ============================================================
   Save Lesson Progress
============================================================ */

export const saveProgress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const studentId = String(req.user.id);

    const progress = await progressService.saveProgress({
      studentId,
      lessonId: req.body.lessonId,
      watchedSeconds: req.body.watchedSeconds,
    });

    return res.status(200).json({
      success: true,
      message: "Progress saved successfully",
      data: progress,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   Get Lesson Progress
============================================================ */

export const getLessonProgress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const studentId = String(req.user.id);

    const lessonId = Array.isArray(req.params.lessonId)
      ? req.params.lessonId[0]
      : req.params.lessonId;

    const progress =
      await progressService.getLessonProgress(
        studentId,
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