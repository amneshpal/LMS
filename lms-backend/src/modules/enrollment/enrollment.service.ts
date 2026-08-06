import prisma from "../../config/prisma";

interface EnrollInput {
  studentId: string;
  courseId: string;
}

export const enrollStudent = async (data: EnrollInput) => {
  // Student exists
  const student = await prisma.user.findUnique({
    where: {
      id: data.studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Course exists
  const course = await prisma.course.findUnique({
    where: {
      id: data.courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  // Already enrolled?
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw new Error("Student already enrolled");
  }

  return prisma.enrollment.create({
    data,
    include: {
      student: true,
      course: true,
    },
  });
};

export const getAllEnrollments = async () => {
  return prisma.enrollment.findMany({
    include: {
      student: true,
      course: true,
    },
    orderBy: {
      enrolledAt: "desc",
    },
  });
};

export const getStudentCourses = async (studentId: string) => {
  return prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: true,
    },
  });
};

export const deleteEnrollment = async (id: string) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      id,
    },
  });

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  return prisma.enrollment.delete({
    where: {
      id,
    },
  });
};