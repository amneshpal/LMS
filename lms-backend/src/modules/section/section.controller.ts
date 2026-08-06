import { Request, Response } from "express";
import * as sectionService from "./section.service";

export const createSection = async (req: Request, res: Response) => {
  try {
    const section = await sectionService.createSection(req.body);

    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSectionsByCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const courseId = req.params.courseId as string;

    const sections =
      await sectionService.getSectionsByCourse(courseId);

    res.json({
      success: true,
      data: sections,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSection = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const section = await sectionService.updateSection(
      id,
      req.body
    );

    res.json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSection = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const result = await sectionService.deleteSection(id);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};