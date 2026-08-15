import prisma from "../../config/prisma";

/* ===========================
   Dashboard Overview
=========================== */

export const getDashboardOverview = async () => {

  const [
    totalStudents,
    totalTeachers,
    totalAdmins,

    totalCourses,
    publishedCourses,
    draftCourses,

    totalCategories,

    totalSections,
    totalLessons,

    totalAssignments,

    totalQuizzes,

    totalEnrollments,

    pendingPayments,
    approvedPayments,
    rejectedPayments,

    totalCertificates,

    totalReviews,

    totalWishlist,

    totalRevenue,

  ] = await Promise.all([

    prisma.user.count({
      where: {
        role: "STUDENT",
      },
    }),

    prisma.user.count({
      where: {
        role: "TEACHER",
      },
    }),

    prisma.user.count({
      where: {
        role: "ADMIN",
      },
    }),

    prisma.course.count(),

    prisma.course.count({
      where: {
        isPublished: true,
      },
    }),

    prisma.course.count({
      where: {
        isPublished: false,
      },
    }),

    prisma.category.count(),

    prisma.section.count(),

    prisma.lesson.count(),

    prisma.assignment.count(),

    prisma.quiz.count(),

    prisma.enrollment.count(),

    prisma.payment.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.payment.count({
      where: {
        status: "APPROVED",
      },
    }),

    prisma.payment.count({
      where: {
        status: "REJECTED",
      },
    }),

    prisma.certificate.count(),

    prisma.review.count(),

    prisma.wishlist.count(),

    prisma.payment.aggregate({

      where: {
        status: "APPROVED",
      },

      _sum: {
        amount: true,
      },

    }),

  ]);

  const ratings =
    await prisma.review.aggregate({

      _avg: {
        rating: true,
      },

    });

  return {

    users: {

      students: totalStudents,

      teachers: totalTeachers,

      admins: totalAdmins,

    },

    courses: {

      total: totalCourses,

      published: publishedCourses,

      draft: draftCourses,

    },

    categories: totalCategories,

    sections: totalSections,

    lessons: totalLessons,

    assignments: totalAssignments,

    quizzes: totalQuizzes,

    enrollments: totalEnrollments,

    wishlist: totalWishlist,

    certificates: totalCertificates,

    reviews: totalReviews,

    averageRating:
      Number(ratings._avg.rating ?? 0),

    payments: {

      pending: pendingPayments,

      approved: approvedPayments,

      rejected: rejectedPayments,

      revenue:
        totalRevenue._sum.amount ?? 0,

    },

  };

};

// ------------------------------------

/* ===========================
   Recent Students
=========================== */

export const getRecentStudents = async () => {

  return prisma.user.findMany({

    where: {
      role: "STUDENT",
    },

    select: {

      id: true,

      fullName: true,

      email: true,

      avatar: true,

      status: true,

      createdAt: true,

    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,

  });

};

/* ===========================
   Recent Payments
=========================== */

export const getRecentPayments = async () => {

  return prisma.payment.findMany({

    include: {

      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },

      course: {
        select: {
          id: true,
          title: true,
          price: true,
        },
      },

    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,

  });

};

/* ===========================
   Recent Enrollments
=========================== */

export const getRecentEnrollments = async () => {

  return prisma.enrollment.findMany({

    include: {

      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
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

    take: 10,

  });

};

/* ===========================
   Recent Reviews
=========================== */

export const getRecentReviews = async () => {

  return prisma.review.findMany({

    include: {

      student: {
        select: {
          id: true,
          fullName: true,
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

    take: 10,

  });

};


/* ===========================
   Top Selling Courses
=========================== */

export const getTopSellingCourses = async () => {

  const courses = await prisma.course.findMany({

    include: {

      enrollments: true,

      reviews: {
        select: {
          rating: true,
        },
      },

      category: {
        select: {
          name: true,
        },
      },

    },

  });

  return courses
    .map((course) => {

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

        thumbnail: course.thumbnail,

        price: course.price,

        category: course.category.name,

        students: totalStudents,

        reviews: totalReviews,

        averageRating,

      };

    })
    .sort(
      (a, b) =>
        b.students - a.students
    )
    .slice(0, 10);

};

/* ===========================
   Top Rated Courses
=========================== */

export const getTopRatedCourses = async () => {

  const courses = await prisma.course.findMany({

    include: {

      reviews: {
        select: {
          rating: true,
        },
      },

      category: {
        select: {
          name: true,
        },
      },

    },

  });

  return courses
    .map((course) => {

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

        thumbnail: course.thumbnail,

        category: course.category.name,

        totalReviews,

        averageRating,

      };

    })
    .sort(
      (a, b) =>
        b.averageRating -
        a.averageRating
    )
    .slice(0, 10);

};

/* ===========================
   Revenue Analytics
=========================== */

export const getRevenueAnalytics = async () => {

  const payments =
    await prisma.payment.findMany({

      where: {
        status: "APPROVED",
      },

      orderBy: {
        createdAt: "asc",
      },

    });

  return payments;

};

/* ===========================
   Enrollment Analytics
=========================== */

export const getEnrollmentAnalytics =
  async () => {

    const enrollments =
      await prisma.enrollment.findMany({

        orderBy: {
          enrolledAt: "asc",
        },

      });

    return enrollments;

};