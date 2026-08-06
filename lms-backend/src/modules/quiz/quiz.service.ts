import prisma from "../../config/prisma";

const prismaAny = prisma as any;

interface CreateQuizInput {
  title: string;
  description?: string;
  passingMarks?: number;
  lessonId: string;
}

export const createQuiz = async (
  data: CreateQuizInput
) => {

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: data.lessonId,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const existingQuiz = await prismaAny.quiz.findUnique({
    where: {
      lessonId: data.lessonId,
    },
  });

  if (existingQuiz) {
    throw new Error("Quiz already exists for this lesson");
  }

  return prismaAny.quiz.create({
    data,
    include: {
      lesson: true,
    },
  });

};

export const getQuizByLesson = async (
  lessonId: string
) => {

  const quiz = await prismaAny.quiz.findUnique({

    where: {
      lessonId,
    },

    include: {

      questions: {

        include: {

          options: true,

        },

      },

    },

  });

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz;

};

export const deleteQuiz = async (
  id: string
) => {

  await prismaAny.quiz.delete({

    where: {
      id,
    },

  });

  return {
    success: true,
    message: "Quiz deleted successfully",
  };

};