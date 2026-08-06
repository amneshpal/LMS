import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const canAccessLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lessonId = req.params.id as string;

    // Lesson + Section + Course
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        section: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    /*
      Preview lesson
      Everyone can watch
    */

    if (lesson.isPreview) {
      return next();
    }

    /*
      Paid Lesson
    */

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    /*
      Admin & Teacher
    */

    if (
      decoded.role === "ADMIN" ||
      decoded.role === "TEACHER"
    ) {
      return next();
    }

    /*
      Student Enrollment Check
    */

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: decoded.id,
          courseId: lesson.section.course.id,
        },
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You have not purchased this course",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};