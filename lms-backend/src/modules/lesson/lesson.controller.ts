// import { Request, Response } from "express";
// import * as lessonService from "./lesson.service";

// export const createLesson = async (req: Request, res: Response) => {
//   try {
//     const lesson = await lessonService.createLesson(req.body);

//     res.status(201).json({
//       success: true,
//       data: lesson,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getLessonsBySection = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const sectionId = req.params.sectionId as string;

//     const lessons =
//       await lessonService.getLessonsBySection(sectionId);

//     res.json({
//       success: true,
//       data: lessons,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getLessonById = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const id = req.params.id as string;

//     const lesson = await lessonService.getLessonById(id);

//     res.json({
//       success: true,
//       data: lesson,
//     });
//   } catch (error: any) {
//     res.status(404).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateLesson = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const id = req.params.id as string;

//     const lesson = await lessonService.updateLesson(
//       id,
//       req.body
//     );

//     res.json({
//       success: true,
//       data: lesson,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteLesson = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const id = req.params.id as string;

//     const result = await lessonService.deleteLesson(id);

//     res.json(result);
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import { Request, Response } from "express";
import * as lessonService from "./lesson.service";

/* ============================================================
   Create Lesson (ADMIN)
============================================================ */

export const createLesson = async (
  req: Request,
  res: Response
) => {
  try {
    const lesson = await lessonService.createLesson(req.body);

    return res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   Get Lessons By Section
============================================================ */

export const getLessonsBySection = async (
  req: Request,
  res: Response
) => {
  try {
    const sectionId = Array.isArray(req.params.sectionId)
      ? req.params.sectionId[0]
      : req.params.sectionId;

    const lessons =
      await lessonService.getLessonsBySection(sectionId);

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   Get Lesson By ID
============================================================ */

export const getLessonById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const lesson =
      await lessonService.getLessonById(id);

    return res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   Update Lesson (ADMIN)
============================================================ */

export const updateLesson = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const lesson =
      await lessonService.updateLesson(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   Delete Lesson (ADMIN)
============================================================ */

export const deleteLesson = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result =
      await lessonService.deleteLesson(id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};