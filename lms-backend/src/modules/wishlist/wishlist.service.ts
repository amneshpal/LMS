import prisma from "../../config/prisma";

interface CreateWishlistInput {
  studentId: string;
  courseId: string;
}

/* ===========================
   Add To Wishlist
=========================== */

export const addToWishlist = async (
  data: CreateWishlistInput
) => {

  const course = await prisma.course.findUnique({
    where: {
      id: data.courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const existing = await prisma.wishlist.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (existing) {
    throw new Error("Course already in wishlist");
  }

  return prisma.wishlist.create({
    data,
    include: {
      course: {
        include: {
          category: true,
        },
      },
    },
  });

};

/* ===========================
   My Wishlist
=========================== */

export const getWishlist = async (
  studentId: string
) => {

  return prisma.wishlist.findMany({

    where: {
      studentId,
    },

    include: {
      course: {
        include: {
          category: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

/* ===========================
   Remove Wishlist
=========================== */

export const removeWishlist = async (
  studentId: string,
  courseId: string
) => {

  const wishlist = await prisma.wishlist.findUnique({

    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },

  });

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  await prisma.wishlist.delete({
    where: {
      id: wishlist.id,
    },
  });

  return {
    success: true,
    message: "Course removed from wishlist",
  };

};