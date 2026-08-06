import { Request, Response } from "express";
import * as certificateService from "./certificate.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

/* ===========================
   Generate Certificate
=========================== */

export const generateCertificate = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const certificate =
      await certificateService.generateCertificate({

        studentId: req.user.id,

        courseId: req.params.courseId,

      });

    return res.status(201).json({

      success: true,

      message: "Certificate generated successfully",

      data: certificate,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

/* ===========================
   My Certificates
=========================== */

export const getMyCertificates = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const certificates =
      await certificateService.getMyCertificates(
        req.user.id
      );

    return res.status(200).json({

      success: true,

      data: certificates,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

/* ===========================
   Verify Certificate
=========================== */

export const verifyCertificate = async (
  req: Request,
  res: Response
) => {

  try {

    const certificate =
      await certificateService.verifyCertificate(
        req.params.certificateNumber
      );

    return res.status(200).json({

      success: true,

      data: certificate,

    });

  } catch (error: any) {

    return res.status(404).json({

      success: false,

      message: error.message,

    });

  }

};