import { Request, Response } from "express";
import * as adminService from "./admin.service";

/* ===========================
   Dashboard
=========================== */

export const getDashboard = async (
  req: Request,
  res: Response
) => {

  try {

    const dashboard =
      await adminService.getDashboard();

    return res.status(200).json({

      success: true,

      data: dashboard,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};