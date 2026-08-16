import prisma from "../../config/prisma";

interface UpdateProgressInput {
  watchedSeconds?: number;
  completed?: boolean;
}

const checkEnrollment = async (
  studentId: string,
  lessonId: string
) => {
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
    throw new Error("Lesson not found");
  }

  const enrollment =
    await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId: lesson.section.course.id,
        },
      },
    });

  if (!enrollment) {
    throw new Error(
      "You are not enrolled in this course"
    );
  }

  return lesson;
};

// ==========================================
// Get Lesson Progress
// ==========================================

export const getLessonProgress = async (
  studentId: string,
  lessonId: string
) => {
  await checkEnrollment(
    studentId,
    lessonId
  );

  const progress =
    await prisma.lessonProgress.findUnique({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
    });

  return (
    progress ?? {
      id: null,
      studentId,
      lessonId,
      watchedSeconds: 0,
      completed: false,
      completedAt: null,
    }
  );
};

// ==========================================
// Update Lesson Progress
// ==========================================

export const updateLessonProgress = async (
  studentId: string,
  lessonId: string,
  data: UpdateProgressInput
) => {
  await checkEnrollment(
    studentId,
    lessonId
  );

  const watchedSeconds =
    Math.max(
      0,
      Math.floor(data.watchedSeconds ?? 0)
    );

  const completed =
    data.completed === true;

  return prisma.lessonProgress.upsert({
    where: {
      studentId_lessonId: {
        studentId,
        lessonId,
      },
    },

    create: {
      studentId,
      lessonId,
      watchedSeconds,
      completed,
      completedAt: completed
        ? new Date()
        : null,
    },

    update: {
      watchedSeconds,
      completed,
      completedAt: completed
        ? new Date()
        : null,
    },
  });
};

// ==========================================
// Mark Lesson Complete
// ==========================================

export const completeLesson = async (
  studentId: string,
  lessonId: string
) => {
  await checkEnrollment(
    studentId,
    lessonId
  );

  return prisma.lessonProgress.upsert({
    where: {
      studentId_lessonId: {
        studentId,
        lessonId,
      },
    },

    create: {
      studentId,
      lessonId,
      watchedSeconds: 0,
      completed: true,
      completedAt: new Date(),
    },

    update: {
      completed: true,
      completedAt: new Date(),
    },
  });
};

// ==========================================
// Get All Progress For Course
// ==========================================

export const getCourseLessonProgress = async (
  studentId: string,
  courseId: string
) => {
  const enrollment =
    await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

  if (!enrollment) {
    throw new Error(
      "You are not enrolled in this course"
    );
  }

  return prisma.lessonProgress.findMany({
    where: {
      studentId,
      lesson: {
        section: {
          courseId,
        },
      },
    },
    include: {
      lesson: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};