import prisma from "../../config/prisma";

interface CreateReviewInput {
  studentId: string;
  courseId: string;
  rating: number;
  review?: string;
}

/* ===========================
   Create Review
=========================== */

export const createReview = async (
  data: CreateReviewInput
) => {

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (!enrollment) {
    throw new Error(
      "You are not enrolled in this course"
    );
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (existingReview) {
    throw new Error(
      "You have already reviewed this course"
    );
  }

  return prisma.review.create({
    data,
    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          avatar: true,
        },
      },
      course: true,
    },
  });

};

/* ===========================
   Get Reviews By Course
=========================== */

export const getReviewsByCourse = async (
  courseId: string
) => {

  const reviews = await prisma.review.findMany({

    where: {
      courseId,
    },

    include: {

      student: {
        select: {
          id: true,
          fullName: true,
          avatar: true,
        },
      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

  const aggregate = await prisma.review.aggregate({

    where: {
      courseId,
    },

    _avg: {
      rating: true,
    },

    _count: {
      id: true,
    },

  });

  return {

    averageRating:
      aggregate._avg.rating ?? 0,

    totalReviews:
      aggregate._count.id,

    reviews,

  };

};

/* ===========================
   Update Review
=========================== */

export const updateReview = async (
  reviewId: string,
  studentId: string,
  data: {
    rating?: number;
    review?: string;
  }
) => {

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.studentId !== studentId) {
    throw new Error(
      "You cannot update this review"
    );
  }

  return prisma.review.update({
    where: {
      id: reviewId,
    },
    data,
  });

};

/* ===========================
   Delete Review
=========================== */

export const deleteReview = async (
  reviewId: string,
  studentId: string
) => {

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.studentId !== studentId) {
    throw new Error(
      "You cannot delete this review"
    );
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return {
    success: true,
    message: "Review deleted successfully",
  };

};