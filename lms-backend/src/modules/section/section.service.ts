import prisma from "../../config/prisma";

interface CreateSectionInput {
  title: string;
  description?: string;
  order: number;
  courseId: string;
}

export const createSection = async (data: CreateSectionInput) => {
  const course = await prisma.course.findUnique({
    where: { id: data.courseId },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return prisma.section.create({
    data,
    include: {
      course: true,
    },
  });
};

export const getSectionsByCourse = async (courseId: string) => {
  return prisma.section.findMany({
    where: {
      courseId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      course: true,
    },
  });
};

export const updateSection = async (
  id: string,
  data: Partial<CreateSectionInput>
) => {
  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    throw new Error("Section not found");
  }

  return prisma.section.update({
    where: { id },
    data,
    include: {
      course: true,
    },
  });
};

export const deleteSection = async (id: string) => {
  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    throw new Error("Section not found");
  }

  await prisma.section.delete({
    where: { id },
  });

  return {
    success: true,
    message: "Section deleted successfully",
  };
};