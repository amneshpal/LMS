import prisma from "../../config/prisma";

interface CreateCourseInput {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  price: number;
  categoryId: string;
  teacherId?: string;
}

export const createCourse = async (
  data: CreateCourseInput
) => {
  // Check duplicate course
  const existingCourse =
    await prisma.course.findFirst({
      where: {
        OR: [
          {
            title: data.title,
          },
          {
            slug: data.slug,
          },
        ],
      },
    });

  if (existingCourse) {
    throw new Error("Course already exists");
  }

  // Check category
  const category =
    await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

  if (!category) {
    throw new Error("Category not found");
  }

  // Check teacher
  if (data.teacherId) {
    const teacher =
      await prisma.user.findUnique({
        where: {
          id: data.teacherId,
        },
      });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    if (teacher.role !== "TEACHER") {
      throw new Error(
        "Selected user is not a teacher"
      );
    }
  }

  return prisma.course.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      price: data.price,
      categoryId: data.categoryId,
      teacherId: data.teacherId,
    },

    include: {
      category: true,

      teacher: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

// export const getAllCourses = async () => {
//   return prisma.course.findMany({
//     include: {
//       category: true
//     },
//     orderBy: {
//       createdAt: "desc"
//     }
//   });
// };


// export const getAllCourses = async () => {
//   const courses = await prisma.course.findMany({
//     include: {
//       category: true,
//       reviews: {
//         select: {
//           rating: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return courses.map((course) => {

//     const totalReviews = course.reviews.length;

//     const averageRating =
//       totalReviews === 0
//         ? 0
//         : Number(
//             (
//               course.reviews.reduce(
//                 (sum, review) => sum + review.rating,
//                 0
//               ) / totalReviews
//             ).toFixed(1)
//           );

//     return {
//       ...course,
//       averageRating,
//       totalReviews,
//     };
//   });
// };

export const getAllCourses = async (
  query: any
) => {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where: any = {};

  // Search
  if (query.search) {
    where.title = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  // Category
  if (query.category) {
    where.category = {
      slug: query.category,
    };
  }

  // Price Filter
  if (query.minPrice || query.maxPrice) {

    where.price = {};

    if (query.minPrice) {
      where.price.gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      where.price.lte = Number(query.maxPrice);
    }
  }

  // Sorting
  let orderBy: any = {
    createdAt: "desc",
  };

  if (query.sort === "latest") {
    orderBy = {
      createdAt: "desc",
    };
  }

  if (query.sort === "oldest") {
    orderBy = {
      createdAt: "asc",
    };
  }

  if (query.sort === "price_low") {
    orderBy = {
      price: "asc",
    };
  }

  if (query.sort === "price_high") {
    orderBy = {
      price: "desc",
    };
  }

  const total = await prisma.course.count({
    where,
  });

  const courses = await prisma.course.findMany({

    where,

    skip,

    take: limit,

    orderBy,

    include: {

      category: true,

      reviews: {
        select: {
          rating: true,
        },
      },

    },

  });

  const data = courses.map((course) => {

    const totalReviews = course.reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              course.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          );

    return {
      ...course,
      averageRating,
      totalReviews,
    };

  });

  return {

    data,

    pagination: {

      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),

    },

  };

};
// export const getCourseBySlug = async (slug: string) => {
//   const course = await prisma.course.findUnique({
//     where: { slug },
//     include: {
//       category: true
//     }
//   });

//   if (!course) {
//     throw new Error("Course not found");
//   }

//   return course;
// };


export const getCourseBySlug = async (
  slug: string
) => {

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const totalReviews = course.reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            course.reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        );

  return {
    ...course,
    averageRating,
    totalReviews,
  };
};
export const updateCourse = async (
  id: string,
  data: Partial<CreateCourseInput>,
  userId: string,
  userRole: string
) => {
  const course =
    await prisma.course.findUnique({
      where: {
        id,
      },
    });

  if (!course) {
    throw new Error("Course not found");
  }

  // Teacher can update only own course
  if (
    userRole === "TEACHER" &&
    course.teacherId !== userId
  ) {
    throw new Error(
      "You can only update your own course"
    );
  }

  // If teacherId is being changed
  if (data.teacherId) {
    const teacher =
      await prisma.user.findUnique({
        where: {
          id: data.teacherId,
        },
      });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    if (teacher.role !== "TEACHER") {
      throw new Error(
        "Selected user is not a teacher"
      );
    }
  }

  return prisma.course.update({
    where: {
      id,
    },

    data,

    include: {
      category: true,

      teacher: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};
export const deleteCourse = async (
  id: string,
  userId: string,
  userRole: string
) => {
  const course =
    await prisma.course.findUnique({
      where: {
        id,
      },
    });

  if (!course) {
    throw new Error("Course not found");
  }

  // Teacher can delete only own course
  if (
    userRole === "TEACHER" &&
    course.teacherId !== userId
  ) {
    throw new Error(
      "You can only delete your own course"
    );
  }

  await prisma.course.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Course deleted successfully",
  };
};




// export const getCourseDetails = async (slug: string) => {

//   const course = await prisma.course.findUnique({
//     where: {
//       slug,
//     },
//     include: {
//       category: true,
//       sections: {
//         orderBy: {
//           order: "asc",
//         },
//         include: {
//           lessons: {
//             orderBy: {
//               order: "asc",
//             },
//           },
//         },
//       },
//     },
//   });

//   if (!course) {
//     throw new Error("Course not found");
//   }

//   return course;
// };

export const getCourseDetails = async (
  slug: string
) => {

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,

      reviews: {
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
      },

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

  if (!course) {
    throw new Error("Course not found");
  }

  const totalReviews = course.reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            course.reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        );

  return {
    ...course,
    averageRating,
    totalReviews,
  };
};