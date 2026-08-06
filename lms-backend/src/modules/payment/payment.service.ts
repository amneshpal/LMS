import prisma from "../../config/prisma";

interface CreatePaymentInput {
  studentId: string;
  courseId: string;
  referenceNumber: string;
}

/* ===========================
   Create Payment Request
=========================== */

export const createPayment = async (
  data: CreatePaymentInput
) => {

  // Course Exists
  const course = await prisma.course.findUnique({
    where: {
      id: data.courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  // Already Enrolled
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (enrollment) {
    throw new Error("You already purchased this course");
  }

  // Already Pending
  const payment = await prisma.payment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.studentId,
        courseId: data.courseId,
      },
    },
  });

  if (payment) {
    throw new Error(
      "Payment request already submitted"
    );
  }

  return prisma.payment.create({

    data: {

      studentId: data.studentId,

      courseId: data.courseId,

      amount: course.price,

      referenceNumber: data.referenceNumber,

    },

    include: {

      student: true,

      course: true,

    },

  });

};

/* ===========================
   Student Payment History
=========================== */

export const getMyPayments = async (
  studentId: string
) => {

  return prisma.payment.findMany({

    where: {
      studentId,
    },

    include: {
      course: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

/* ===========================
   Admin Pending Payments
=========================== */

export const getPendingPayments = async () => {

  return prisma.payment.findMany({

    where: {
      status: "PENDING",
    },

    include: {

      student: true,

      course: true,

    },

    orderBy: {
      createdAt: "asc",
    },

  });

};

/* ===========================
   Approve Payment
=========================== */

export const approvePayment = async (
  paymentId: string,
  adminId: string
) => {

  const payment = await prisma.payment.findUnique({

    where: {
      id: paymentId,
    },

  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status !== "PENDING") {
    throw new Error("Payment already processed");
  }

  await prisma.payment.update({

    where: {
      id: paymentId,
    },

    data: {

      status: "APPROVED",

      approvedBy: adminId,

      approvedAt: new Date(),

    },

  });

  await prisma.enrollment.create({

    data: {

      studentId: payment.studentId,

      courseId: payment.courseId,

    },

  });

  return {

    success: true,

    message: "Payment approved successfully",

  };

};

/* ===========================
   Reject Payment
=========================== */

export const rejectPayment = async (
  paymentId: string
) => {

  const payment = await prisma.payment.findUnique({

    where: {
      id: paymentId,
    },

  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  await prisma.payment.update({

    where: {
      id: paymentId,
    },

    data: {
      status: "REJECTED",
    },

  });

  return {

    success: true,

    message: "Payment rejected",

  };

};