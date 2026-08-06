import prisma from "../../config/prisma";

/* ===========================
   Admin Dashboard
=========================== */

export const getDashboard = async () => {

  const totalStudents = await prisma.user.count({
    where: {
      role: "STUDENT",
    },
  });

  const totalAdmins = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  const totalCourses = await prisma.course.count();

  const publishedCourses = await prisma.course.count({
    where: {
      isPublished: true,
    },
  });

  const draftCourses = await prisma.course.count({
    where: {
      isPublished: false,
    },
  });

  const totalEnrollments =
    await prisma.enrollment.count();

  const pendingPayments =
    await prisma.payment.count({
      where: {
        status: "PENDING",
      },
    });

  const approvedPayments =
    await prisma.payment.count({
      where: {
        status: "APPROVED",
      },
    });

  const rejectedPayments =
    await prisma.payment.count({
      where: {
        status: "REJECTED",
      },
    });

  const totalReviews =
    await prisma.review.count();

  const reviews =
    await prisma.review.findMany({
      select: {
        rating: true,
      },
    });

  const averageRating =
    reviews.length === 0
      ? 0
      : Number(
          (
            reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / reviews.length
          ).toFixed(1)
        );

  const revenue =
    await prisma.payment.aggregate({

      where: {
        status: "APPROVED",
      },

      _sum: {
        amount: true,
      },

    });

  return {

    totalStudents,

    totalAdmins,

    totalCourses,

    publishedCourses,

    draftCourses,

    totalEnrollments,

    pendingPayments,

    approvedPayments,

    rejectedPayments,

    totalRevenue:
      revenue._sum.amount || 0,

    totalReviews,

    averageRating,

  };

};