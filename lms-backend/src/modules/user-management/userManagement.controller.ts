import { Request, Response } from "express";
import * as userManagementService from "./userManagement.service";

/* ===========================
   Get All Users
=========================== */

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {

    const users =
      await userManagementService.getAllUsers();

    return res.status(200).json({

      success: true,

      data: users,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Get User By Id
=========================== */

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      await userManagementService.getUserById(
        req.params.id
      );

    return res.status(200).json({

      success: true,

      data: user,

    });

  } catch (error: any) {

    return res.status(404).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Update User Status
=========================== */

export const updateUserStatus = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      await userManagementService.updateUserStatus(

        req.params.id,

        req.body.status

      );

    return res.status(200).json({

      success: true,

      message: "User status updated successfully",

      data: user,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Update User Role
=========================== */

export const updateUserRole = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      await userManagementService.updateUserRole(

        req.params.id,

        req.body.role

      );

    return res.status(200).json({

      success: true,

      message: "User role updated successfully",

      data: user,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Delete User
=========================== */

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await userManagementService.deleteUser(
        req.params.id
      );

    return res.status(200).json(result);

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};