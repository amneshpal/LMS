import prisma from "../../config/prisma";

interface GenerateCertificateInput {
  studentId: string;
  courseId: string;
}

/* ===========================
   Generate Certificate
=========================== */

export const generateCertificate = async (
  data: GenerateCertificateInput
) => {

  // Check Enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (!enrollment) {
    throw new Error("You are not enrolled in this course");
  }

  // Check Existing Certificate
  const existingCertificate =
    await prisma.certificate.findUnique({
      where: {
        studentId_courseId: {
          studentId: data.studentId,
          courseId: data.courseId,
        },
      },
    });

  if (existingCertificate) {
    return existingCertificate;
  }

  // Course
  const course = await prisma.course.findUnique({
    where: {
      id: data.courseId,
    },
    include: {
      sections: {
        include: {
          lessons: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  // Total Lessons
  const lessons = course.sections.flatMap(
    (section) => section.lessons
  );

  const totalLessons = lessons.length;

  // Completed Lessons
  const completedLessons =
    await prisma.lessonProgress.count({
      where: {
        studentId: data.studentId,
        lessonId: {
          in: lessons.map((lesson) => lesson.id),
        },
        completed: true,
      },
    });

  if (completedLessons !== totalLessons) {
    throw new Error(
      "Complete all lessons before generating certificate."
    );
  }

  // Certificate Number
  const certificateNumber =
    `CERT-${Date.now()}`;

  return prisma.certificate.create({

    data: {

      certificateNumber,

      studentId: data.studentId,

      courseId: data.courseId,

    },

    include: {

      student: true,

      course: true,

    },

  });

};

/* ===========================
   My Certificates
=========================== */

export const getMyCertificates = async (
  studentId: string
) => {

  return prisma.certificate.findMany({

    where: {
      studentId,
    },

    include: {
      course: true,
    },

    orderBy: {
      issuedAt: "desc",
    },

  });

};

/* ===========================
   Verify Certificate
=========================== */

export const verifyCertificate = async (
  certificateNumber: string
) => {

  const certificate =
    await prisma.certificate.findUnique({

      where: {
        certificateNumber,
      },

      include: {
        student: true,
        course: true,
      },

    });

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  return certificate;

};