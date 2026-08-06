// import prisma from "../../config/prisma";

// interface CreateCategoryInput {
//   name: string;
//   slug: string;
//   description?: string;
// }
// prisma.user.findMany();
// export const createCategory = async (data: CreateCategoryInput) => {
//   const existingCategory = await prisma.category.findFirst({
//     where: {
//       OR: [
//         { name: data.name },
//         { slug: data.slug }
//       ]
//     }
//   });

//   if (existingCategory) {
//     throw new Error("Category already exists");
//   }

//   return prisma.category.create({
//     data,
//   });
// };

// export const getAllCategories = async () => {
//   return prisma.category.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };


import prisma from "../../config/prisma";

interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
}

export const createCategory = async (data: CreateCategoryInput) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [
        { name: data.name },
        { slug: data.slug }
      ]
    }
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data,
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};


export const updateCategory = async (
  id: string,
  data: Partial<CreateCategoryInput>
) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  if (data.name || data.slug) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        AND: [
          {
            id: {
              not: id,
            },
          },
          {
            OR: [
              {
                name: data.name,
              },
              {
                slug: data.slug,
              },
            ],
          },
        ],
      },
    });

    if (existingCategory) {
      throw new Error("Category name or slug already exists");
    }
  }

  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Category deleted successfully",
  };
};