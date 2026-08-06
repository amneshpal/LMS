import { Request, Response } from "express";
import * as paymentService from "./payment.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

/* ===========================
   Student
=========================== */

// Create Payment

export const createPayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const payment =
      await paymentService.createPayment({

        studentId: req.user.id,

        courseId: req.body.courseId,

        referenceNumber: req.body.referenceNumber,

      });

    return res.status(201).json({

      success: true,

      message: "Payment request submitted successfully",

      data: payment,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

// My Payments

export const getMyPayments = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const payments =
      await paymentService.getMyPayments(
        req.user.id
      );

    return res.json({

      success: true,

      data: payments,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

/* ===========================
   ADMIN
=========================== */

// Pending Payments

export const getPendingPayments = async (
  req: Request,
  res: Response
) => {

  try {

    const payments =
      await paymentService.getPendingPayments();

    return res.json({

      success: true,

      data: payments,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

// Approve Payment

export const approvePayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const result =
      await paymentService.approvePayment(

        req.params.id,

        req.user.id

      );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

// Reject Payment

export const rejectPayment = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await paymentService.rejectPayment(
        req.params.id
      );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};