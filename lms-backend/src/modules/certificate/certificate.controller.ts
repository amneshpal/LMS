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

    const courseId = Array.isArray(req.params.courseId)
      ? req.params.courseId[0]
      : req.params.courseId;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course id is required",
      });
    }

    const certificate =
      await certificateService.generateCertificate({

        studentId: req.user.id,

        courseId,

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

    const certificateNumber = Array.isArray(req.params.certificateNumber)
      ? req.params.certificateNumber[0]
      : req.params.certificateNumber;

    const certificate =
      await certificateService.verifyCertificate(
        certificateNumber
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

/* ===========================
   Download Certificate
=========================== */

export const downloadCertificate = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Certificate id is required",
      });
    }

    const { pdf, certificate } =
      await certificateService.downloadCertificate(id);

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${certificate.certificateNumber}.pdf"`
    );

    pdf.pipe(res);

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};