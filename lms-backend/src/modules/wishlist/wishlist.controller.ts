import { Request, Response } from "express";
import * as wishlistService from "./wishlist.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

/* ===========================
   Add To Wishlist
=========================== */

export const addToWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const wishlist =
      await wishlistService.addToWishlist({

        studentId: req.user.id,

        courseId: req.body.courseId,

      });

    return res.status(201).json({

      success: true,

      message: "Course added to wishlist",

      data: wishlist,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   My Wishlist
=========================== */

export const getWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const wishlist =
      await wishlistService.getWishlist(
        req.user.id
      );

    return res.json({

      success: true,

      data: wishlist,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Remove Wishlist
=========================== */

export const removeWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const result =
      await wishlistService.removeWishlist(

        req.user.id,

        getParamValue(req.params.courseId)

      );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};