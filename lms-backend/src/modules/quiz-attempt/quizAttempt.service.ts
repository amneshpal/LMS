import prisma from "../../config/prisma";

interface SubmitAnswer {
  questionId: string;
  optionId: string;
}

interface SubmitQuizInput {
  studentId: string;
  quizId: string;
  answers: SubmitAnswer[];
}

/* ===========================
   Submit Quiz
=========================== */

export const submitQuiz = async (
  data: SubmitQuizInput
) => {

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: data.quizId,
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

  let score = 0;

  const savedAnswers: {
    questionId: string;
    optionId: string;
    isCorrect: boolean;
  }[] = [];

  for (const answer of data.answers) {

    const question = quiz.questions.find(
      (q) => q.id === answer.questionId
    );

    if (!question) {
      throw new Error(`Question not found: ${answer.questionId}`);
    }

    // Option must belong to this question
    const selectedOption = question.options.find(
      (o) => o.id === answer.optionId
    );

    if (!selectedOption) {
      throw new Error(
        `Invalid option selected for question ${answer.questionId}`
      );
    }

    const isCorrect = selectedOption.isCorrect;

    if (isCorrect) {
      score++;
    }

    savedAnswers.push({
      questionId: question.id,
      optionId: selectedOption.id,
      isCorrect,
    });
  }

  const totalQuestions = quiz.questions.length;

  const percentage =
    totalQuestions === 0
      ? 0
      : Number(((score / totalQuestions) * 100).toFixed(2));

  const passed = percentage >= quiz.passingMarks;

  console.log("Saved Answers =>", savedAnswers);

  return prisma.quizAttempt.create({
    data: {
      studentId: data.studentId,
      quizId: data.quizId,
      score,
      totalQuestions,
      percentage,
      passed,

      answers: {
        create: savedAnswers,
      },
    },
    include: {
      quiz: true,
      answers: true,
    },
  });
};

/* ===========================
   Get Quiz Result
=========================== */

export const getQuizResult = async (
  studentId: string,
  quizId: string
) => {

  const result = await prisma.quizAttempt.findFirst({
    where: {
      studentId,
      quizId,
    },
    include: {
      quiz: true,
      answers: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  if (!result) {
    throw new Error("Result not found");
  }

  return result;
};

/* ===========================
   Attempt History
=========================== */

export const getAttemptHistory = async (
  studentId: string
) => {

  return prisma.quizAttempt.findMany({
    where: {
      studentId,
    },
    include: {
      quiz: true,
      answers: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
};