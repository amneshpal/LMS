import prisma from "../../config/prisma";

const db = prisma as any;

interface CreateQuestionInput {
  question: string;
  quizId: string;
}

export const createQuestion = async (
  data: CreateQuestionInput
) => {

  return db.question.create({
    data,
    include: {
      quiz: true,
    },
  });

};

export const getQuestionsByQuiz = async (
  quizId: string
) => {

  return db.question.findMany({

    where: {
      quizId,
    },

    include: {
      options: true,
    },

    orderBy: {
      createdAt: "asc",
    },

  });

};

export const updateQuestion = async (
  id: string,
  question: string
) => {

  return db.question.update({

    where: {
      id,
    },

    data: {
      question,
    },

  });

};

export const deleteQuestion = async (
  id: string
) => {

  await db.question.delete({

    where: {
      id,
    },

  });

  return {

    success: true,

    message: "Question deleted successfully",

  };

};