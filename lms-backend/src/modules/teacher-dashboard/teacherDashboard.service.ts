import prisma from "../../config/prisma";

/* ===========================
   Teacher Dashboard Overview
=========================== */
export const getTeacherDashboard = async (
  teacherId: string
) => {
  const [
    totalCourses,
    publishedCourses,
    draftCourses,
    totalEnrollments,
    totalAssignments,
    totalSubmissions,
    totalQuizzes,
    totalQuizAttempts,
    totalReviews,
  ] = await Promise.all([
    prisma.course.count({
      where: { teacherId },
    }),

    prisma.course.count({
      where: {
        teacherId,
        isPublished: true,
      },
    }),

    prisma.course.count({
      where: {
        teacherId,
        isPublished: false,
      },
    }),

    prisma.enrollment.count({
      where: {
        course: {
          teacherId,
        },
      },
    }),

    prisma.assignment.count({
      where: {
        lesson: {
          section: {
            course: {
              teacherId,
            },
          },
        },
      },
    }),

    prisma.assignmentSubmission.count({
      where: {
        assignment: {
          lesson: {
            section: {
              course: {
                teacherId,
              },
            },
          },
        },
      },
    }),

    prisma.quiz.count({
      where: {
        lesson: {
          section: {
            course: {
              teacherId,
            },
          },
        },
      },
    }),

    prisma.quizAttempt.count({
      where: {
        quiz: {
          lesson: {
            section: {
              course: {
                teacherId,
              },
            },
          },
        },
      },
    }),

    prisma.review.count({
      where: {
        course: {
          teacherId,
        },
      },
    }),
  ]);

  const rating = await prisma.review.aggregate({
    where: {
      course: {
        teacherId,
      },
    },
    _avg: {
      rating: true,
    },
  });

  return {
    teacherId,

    courses: {
      total: totalCourses,
      published: publishedCourses,
      draft: draftCourses,
    },

    enrollments: {
      total: totalEnrollments,
    },

    assignments: {
      total: totalAssignments,
      submissions: totalSubmissions,
    },

    quizzes: {
      total: totalQuizzes,
      attempts: totalQuizAttempts,
    },

    reviews: {
      total: totalReviews,
      averageRating: Number(
        (rating._avg.rating ?? 0).toFixed(1)
      ),
    },
  };
};

/* ===========================
   Teacher Courses
=========================== */

export const getTeacherCourses = async (
  teacherId: string
) => {
  const courses = await prisma.course.findMany({
    where: {
      teacherId,
    },

    include: {
      category: true,

      enrollments: {
        select: {
          id: true,
        },
      },

      reviews: {
        select: {
          rating: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return courses.map((course) => {
    const totalStudents =
      course.enrollments.length;

    const totalReviews =
      course.reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              course.reviews.reduce(
                (sum, review) =>
                  sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          );

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      thumbnail: course.thumbnail,
      price: course.price,
      isPublished: course.isPublished,

      category: course.category,

      totalStudents,
      totalReviews,
      averageRating,
    };
  });
};

/* ===========================
   Teacher Students
=========================== */

export const getTeacherStudents = async (
  teacherId: string
) => {
  return prisma.enrollment.findMany({
    where: {
      course: {
        teacherId,
      },
    },

    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
          status: true,
        },
      },

      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },

    orderBy: {
      enrolledAt: "desc",
    },
  });
};

/* ===========================
   Teacher Assignments
=========================== */

export const getTeacherAssignments = async (
  teacherId: string
) => {
  const assignments =
    await prisma.assignment.findMany({
      where: {
        lesson: {
          section: {
            course: {
              teacherId,
            },
          },
        },
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

        submissions: {
          select: {
            id: true,
            studentId: true,
            marks: true,
            submittedAt: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return assignments.map((assignment) => {
    const totalSubmissions =
      assignment.submissions.length;

    const checkedSubmissions =
      assignment.submissions.filter(
        (submission) =>
          submission.marks !== null
      ).length;

    return {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxMarks: assignment.maxMarks,

      lesson: {
        id: assignment.lesson.id,
        title: assignment.lesson.title,
      },

      course: {
        id: assignment.lesson.section.course.id,
        title: assignment.lesson.section.course.title,
      },

      totalSubmissions,

      checkedSubmissions,

      pendingSubmissions:
        totalSubmissions -
        checkedSubmissions,
    };
  });
};

/* ===========================
   Teacher Quizzes
=========================== */

export const getTeacherQuizzes = async (
  teacherId: string
) => {
  const quizzes = await prisma.quiz.findMany({
    where: {
      lesson: {
        section: {
          course: {
            teacherId,
          },
        },
      },
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

      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    passingMarks: quiz.passingMarks,

    lesson: {
      id: quiz.lesson.id,
      title: quiz.lesson.title,
    },

    course: {
      id: quiz.lesson.section.course.id,
      title: quiz.lesson.section.course.title,
    },

    totalQuestions:
      quiz._count.questions,

    totalAttempts:
      quiz._count.attempts,
  }));
};

/* ===========================
   Teacher Reviews
=========================== */

export const getTeacherReviews = async (
  teacherId: string
) => {
  return prisma.review.findMany({
    where: {
      course: {
        teacherId,
      },
    },

    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          avatar: true,
        },
      },

      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};