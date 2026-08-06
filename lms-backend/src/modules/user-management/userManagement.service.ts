import prisma from "../../config/prisma";

/* ===========================
   Get All Users
=========================== */

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/* ===========================
   Get User By Id
=========================== */

export const getUserById = async (
  id: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,

      enrollments: {
        include: {
          course: true,
        },
      },

      reviews: {
        include: {
          course: true,
        },
      },

      wishlists: {
        include: {
          course: true,
        },
      },

      attempts: {
        include: {
          quiz: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/* ===========================
   Update User Status
=========================== */

export const updateUserStatus = async (
  id: string,
  status: "ACTIVE" | "INACTIVE" | "BLOCKED"
) => {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

/* ===========================
   Update User Role
=========================== */

export const updateUserRole = async (
  id: string,
  role: "ADMIN" | "TEACHER" | "STUDENT"
) => {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};

/* ===========================
   Delete User
=========================== */

export const deleteUser = async (
  id: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "User deleted successfully",
  };
};