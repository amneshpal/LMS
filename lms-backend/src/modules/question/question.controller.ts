import { Request, Response } from "express";
import * as questionService from "./question.service";

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

export const createQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const question = await questionService.createQuestion(
      req.body
    );

    return res.status(201).json({
      success: true,
      data: question,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getQuestionsByQuiz = async (
  req: Request,
  res: Response
) => {
  try {

    const questions =
      await questionService.getQuestionsByQuiz(
        getParamValue(req.params.quizId)
      );

    return res.json({
      success: true,
      data: questions,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateQuestion = async (
  req: Request,
  res: Response
) => {
  try {

    const question =
      await questionService.updateQuestion(
        getParamValue(req.params.id),
        req.body.question
      );

    return res.json({
      success: true,
      data: question,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await questionService.deleteQuestion(
        getParamValue(req.params.id)
      );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};