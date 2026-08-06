import prisma from "../../config/prisma";

interface CreateOptionInput {
  option: string;
  isCorrect: boolean;
  questionId: string;
}

export const createOption = async (
  data: CreateOptionInput
) => {

  const question = await prisma.question.findUnique({
    where: {
      id: data.questionId,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  return prisma.option.create({
    data,
    include: {
      question: true,
    },
  });

};

export const getOptionsByQuestion = async (
  questionId: string
) => {

  return prisma.option.findMany({

    where: {
      questionId,
    },

    orderBy: {
      createdAt: "asc",
    },

  });

};

export const updateOption = async (
  id: string,
  data: {
    option?: string;
    isCorrect?: boolean;
  }
) => {

  return prisma.option.update({

    where: {
      id,
    },

    data,

  });

};

export const deleteOption = async (
  id: string
) => {

  await prisma.option.delete({

    where: {
      id,
    },

  });

  return {

    success: true,

    message: "Option deleted successfully",

  };

};