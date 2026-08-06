import prisma from "../../config/prisma";

interface ProgressInput {
  studentId: string;
  lessonId: string;
  watchedSeconds: number;
}

const lessonProgress = (prisma as any).lessonProgress;

export const saveProgress = async (
  data: ProgressInput
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: data.lessonId,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const progress = await lessonProgress.upsert({
    where: {
      studentId_lessonId: {
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    },

    update: {
      watchedSeconds: data.watchedSeconds,

      completed:
        lesson.duration != null &&
        data.watchedSeconds >= lesson.duration,

      completedAt:
        lesson.duration != null &&
        data.watchedSeconds >= lesson.duration
          ? new Date()
          : null,
    },

    create: {
      studentId: data.studentId,

      lessonId: data.lessonId,

      watchedSeconds: data.watchedSeconds,

      completed:
        lesson.duration != null &&
        data.watchedSeconds >= lesson.duration,

      completedAt:
        lesson.duration != null &&
        data.watchedSeconds >= lesson.duration
          ? new Date()
          : null,
    },
  });

  return progress;
};

export const getLessonProgress = async (
  studentId: string,
  lessonId: string
) => {
  return (prisma as any).lessonProgress.findUnique({
    where: {
      studentId_lessonId: {
        studentId,
        lessonId,
      },
    },
  });
};