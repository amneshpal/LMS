import { Request, Response } from "express";
import * as quizService from "./quiz.service";

export const createQuiz = async (
  req: Request,
  res: Response
) => {

  try {

    const quiz =
      await quizService.createQuiz(req.body);

    return res.status(201).json({

      success: true,

      data: quiz,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

export const getQuizByLesson = async (
  req: Request,
  res: Response
) => {

  try {

    const lessonId = Array.isArray(req.params.lessonId)
      ? req.params.lessonId[0]
      : req.params.lessonId;

    const quiz =
      await quizService.getQuizByLesson(lessonId);

    return res.json({

      success: true,

      data: quiz,

    });

  } catch (error: any) {

    return res.status(404).json({

      success: false,

      message: error.message,

    });

  }

};

export const deleteQuiz = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result =
      await quizService.deleteQuiz(id);

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};