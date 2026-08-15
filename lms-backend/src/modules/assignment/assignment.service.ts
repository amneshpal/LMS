import prisma from "../../config/prisma";

interface CreateAssignmentInput {
  title: string;
  description: string;
  dueDate?: Date;
  maxMarks: number;
  lessonId: string;
}

interface SubmitAssignmentInput {
  assignmentId: string;
  studentId: string;
  fileUrl: string;
  remarks?: string;
}

interface EvaluateAssignmentInput {
  submissionId: string;
  marks: number;
  feedback?: string;
}

/* ===========================
   Create Assignment
=========================== */

export const createAssignment = async (
  data: CreateAssignmentInput
) => {

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: data.lessonId,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return prisma.assignment.create({
    data,
    include: {
      lesson: true,
    },
  });

};

/* ===========================
   Get Assignments By Lesson
=========================== */

export const getAssignmentsByLesson = async (
  lessonId: string
) => {

  return prisma.assignment.findMany({

    where: {
      lessonId,
    },

    include: {
      lesson: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

/* ===========================
   Get Assignment By Id
=========================== */

export const getAssignmentById = async (
  id: string
) => {

  const assignment =
    await prisma.assignment.findUnique({

      where: {
        id,
      },

      include: {
        lesson: true,
      },

    });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  return assignment;

};

/* ===========================
   Update Assignment
=========================== */

export const updateAssignment = async (
  id: string,
  data: Partial<CreateAssignmentInput>
) => {

  const assignment = await prisma.assignment.findUnique({
    where: {
      id,
    },
  });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  return prisma.assignment.update({
    where: {
      id,
    },

    data: data,

    include: {
      lesson: true,
    },
  });

};

/* ===========================
   Delete Assignment
=========================== */

export const deleteAssignment = async (
  id: string
) => {

  const assignment =
    await prisma.assignment.findUnique({

      where: {
        id,
      },

    });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  await prisma.assignment.delete({

    where: {
      id,
    },

  });

  return {

    success: true,

    message: "Assignment deleted successfully",

  };

};

/* ===========================
   Submit Assignment
=========================== */

export const submitAssignment = async (
  data: SubmitAssignmentInput
) => {

  const assignment =
    await prisma.assignment.findUnique({

      where: {
        id: data.assignmentId,
      },

    });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const existing =
    await prisma.assignmentSubmission.findUnique({

      where: {
        assignmentId_studentId: {
          assignmentId: data.assignmentId,
          studentId: data.studentId,
        },
      },

    });

  if (existing) {
    throw new Error("Assignment already submitted");
  }

  return prisma.assignmentSubmission.create({

    data: {

      assignmentId: data.assignmentId,

      studentId: data.studentId,

      fileUrl: data.fileUrl,

      remarks: data.remarks,

    },

    include: {

      assignment: true,

      student: true,

    },

  });

};

/* ===========================
   My Assignments
=========================== */

export const getMyAssignments = async (
  studentId: string
) => {

  return prisma.assignmentSubmission.findMany({

    where: {
      studentId,
    },

    include: {

      assignment: {
        include: {
          lesson: true,
        },
      },

    },

    orderBy: {
      submittedAt: "desc",
    },

  });

};

/* ===========================
   Assignment Result
=========================== */

export const getAssignmentResult = async (
  assignmentId: string,
  studentId: string
) => {

  const submission =
    await prisma.assignmentSubmission.findUnique({

      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId,
        },
      },

      include: {
        assignment: true,
      },

    });

  if (!submission) {
    throw new Error("Submission not found");
  }

  return submission;

};

/* ===========================
   Get All Submissions
=========================== */

export const getAssignmentSubmissions = async (
  assignmentId: string
) => {

  const assignment =
    await prisma.assignment.findUnique({

      where: {
        id: assignmentId,
      },

    });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  return prisma.assignmentSubmission.findMany({

    where: {
      assignmentId,
    },

    include: {

      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
        },
      },

    },

    orderBy: {
      submittedAt: "asc",
    },

  });

};

/* ===========================
   Give Marks & Feedback
=========================== */

export const evaluateAssignment = async (
  data: EvaluateAssignmentInput
) => {

  const submission =
    await prisma.assignmentSubmission.findUnique({

      where: {
        id: data.submissionId,
      },

      include: {
        assignment: true,
      },

    });

  if (!submission) {
    throw new Error("Submission not found");
  }

  if (
    data.marks < 0 ||
    data.marks > submission.assignment.maxMarks
  ) {
    throw new Error(
      `Marks must be between 0 and ${submission.assignment.maxMarks}`
    );
  }

  return prisma.assignmentSubmission.update({

    where: {
      id: data.submissionId,
    },

    data: {

      marks: data.marks,

      feedback: data.feedback,

    },

    include: {

      assignment: true,

      student: true,

    },

  });

};