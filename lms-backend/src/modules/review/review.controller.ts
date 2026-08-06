import { Request, Response } from "express";
import * as reviewService from "./review.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

/* ===========================
   Create Review
=========================== */

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const review = await reviewService.createReview({
      studentId: req.user.id,
      courseId: req.body.courseId,
      rating: req.body.rating,
      review: req.body.review,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Get Reviews By Course
=========================== */

export const getReviewsByCourse = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await reviewService.getReviewsByCourse(
        getParamValue(req.params.courseId)
      );

    return res.json({
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

/* ===========================
   Update Review
=========================== */

export const updateReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const review =
      await reviewService.updateReview(
        getParamValue(req.params.id),
        req.user.id,
        req.body
      );

    return res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Delete Review
=========================== */

export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const result =
      await reviewService.deleteReview(
        getParamValue(req.params.id),
        req.user.id
      );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};