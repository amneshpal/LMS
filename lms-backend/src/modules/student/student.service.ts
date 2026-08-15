import prisma from "../../config/prisma";

export const getMyCourses = async (
    studentId: string
) => {

    return prisma.enrollment.findMany({

        where: {
            studentId
        },

        include: {

            course: {

                include: {

                    category: true
                }
            }

        },

        orderBy: {

            enrolledAt: "desc"
        }

    });

};

export const getMyCourse = async (
  studentId: string,
  courseId: string
) => {
  // Enrollment check
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw new Error("You are not enrolled in this course");
  }

  return prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      category: true,
      sections: {
        orderBy: {
          order: "asc",
        },
        include: {
          lessons: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });
};

export const getCourseProgress = async (
  studentId: string,
  courseId: string
) => {

  // Enrollment Check
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw new Error("You are not enrolled in this course");
  }

  // Total Lessons
  const lessons = await prisma.lesson.findMany({
    where: {
      section: {
        courseId,
      },
    },
    select: {
      id: true,
    },
  });

  const totalLessons = lessons.length;

  const lessonIds = lessons.map((lesson) => lesson.id);

  // Completed Lessons
  let completedLessons = 0;

  if (lessonIds.length > 0) {
    const completedLessonsResult = await prisma.$queryRawUnsafe<
      Array<{ count: bigint }>
    >(
      `SELECT COUNT(*) as count FROM "LessonProgress" WHERE "studentId" = $1 AND "lessonId" IN (${lessonIds
        .map((_, index) => `$${index + 2}`)
        .join(", ")}) AND "completed" = true`,
      studentId,
      ...lessonIds
    );

    completedLessons = Number(completedLessonsResult[0]?.count ?? 0);
  }

  const progress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return {
    totalLessons,
    completedLessons,
    progress,
  };
};

export const getContinueLearning = async (
  studentId: string
) => {

  return (prisma as any).lessonProgress.findMany({

    where: {
      studentId,
      watchedSeconds: {
        gt: 0,
      },
      completed: false,
    },

    orderBy: {
      updatedAt: "desc",
    },

    include: {

      lesson: {

        include: {

          section: {

            include: {

              course: true,

            },

          },

        },

      },

    },

  });

};

export const getCompletedCourses = async (
  studentId: string
) => {

  const enrollments = await prisma.enrollment.findMany({

    where: {
      studentId,
    },

    include: {

      course: {

        include: {

          sections: {

            include: {

              lessons: true,

            },

          },

        },

      },

    },

  });

  const completedCourses = [];

  for (const enrollment of enrollments) {

    const lessonIds =
      enrollment.course.sections.flatMap(section =>
        section.lessons.map(lesson => lesson.id)
      );

    if (lessonIds.length === 0) continue;

    const completedLessons =
      await (prisma as any).lessonProgress.count({

        where: {

          studentId,

          lessonId: {
            in: lessonIds,
          },

          completed: true,

        },

      });

    if (completedLessons === lessonIds.length) {

      completedCourses.push({

        courseId: enrollment.course.id,

        title: enrollment.course.title,

        thumbnail: enrollment.course.thumbnail,

        totalLessons: lessonIds.length,

      });

    }

  }

  return completedCourses;

};


export const getDashboard = async (studentId: string) => {
  // Total enrolled courses
  const totalCourses = await prisma.enrollment.count({
    where: {
      studentId,
    },
  });

  // Total certificates
  const certificates = await prisma.certificate.count({
    where: {
      studentId,
    },
  });

  // Student enrollments with course lessons
  const enrollments = await prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: {
        include: {
          sections: {
            include: {
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      enrolledAt: "desc",
    },
  });

  let completedCourses = 0;
  let inProgressCourses = 0;

  for (const enrollment of enrollments) {
    const lessonIds =
      enrollment.course.sections.flatMap((section) =>
        section.lessons.map((lesson) => lesson.id)
      );

    // Course without lessons
    if (lessonIds.length === 0) {
      continue;
    }

    const completedLessons =
      await prisma.lessonProgress.count({
        where: {
          studentId,
          lessonId: {
            in: lessonIds,
          },
          completed: true,
        },
      });

    if (completedLessons === lessonIds.length) {
      completedCourses++;
    } else if (completedLessons > 0) {
      inProgressCourses++;
    }
  }

  // Continue learning
  const continueLearning =
    await prisma.lessonProgress.findMany({
      where: {
        studentId,
        watchedSeconds: {
          gt: 0,
        },
        completed: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnail: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  // Recent courses
  const recentCourses = enrollments
    .slice(0, 5)
    .map((enrollment) => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      slug: enrollment.course.slug,
      thumbnail: enrollment.course.thumbnail,
      enrolledAt: enrollment.enrolledAt,
    }));

  return {
    stats: {
      totalCourses,
      inProgressCourses,
      completedCourses,
      certificates,
    },

    continueLearning,

    recentCourses,
  };
};