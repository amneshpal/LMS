import { Request, Response } from "express";
import * as optionService from "./option.service";

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

export const createOption = async (
  req: Request,
  res: Response
) => {
  try {

    const option = await optionService.createOption(
      req.body
    );

    return res.status(201).json({
      success: true,
      data: option,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getOptionsByQuestion = async (
  req: Request,
  res: Response
) => {
  try {

    const options =
      await optionService.getOptionsByQuestion(
        getParamValue(req.params.questionId)
      );

    return res.json({
      success: true,
      data: options,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateOption = async (
  req: Request,
  res: Response
) => {
  try {

    const option =
      await optionService.updateOption(
        getParamValue(req.params.id),
        req.body
      );

    return res.json({
      success: true,
      data: option,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteOption = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await optionService.deleteOption(
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