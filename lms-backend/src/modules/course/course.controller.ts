import { Request, Response } from "express";
import * as courseService from "./course.service";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.createCourse(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getAllCourses = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const courses = await courseService.getAllCourses();

//     res.status(200).json({
//       success: true,
//       data: courses,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getAllCourses = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await courseService.getAllCourses(
        req.query
      );

    res.status(200).json({

      success: true,

      ...result,

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
export const getCourseBySlug = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = req.params.slug as string;

    const course = await courseService.getCourseBySlug(slug);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const course = await courseService.updateCourse(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const result = await courseService.deleteCourse(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCourseDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = req.params.slug as string;

    const course =
      await courseService.getCourseDetails(slug);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};