import { Router, RequestHandler } from "express";
import * as wishlistController from "./wishlist.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

/* ===========================
   STUDENT
=========================== */

// Add To Wishlist
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  wishlistController.addToWishlist as unknown as RequestHandler
);

// My Wishlist
router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  wishlistController.getWishlist as unknown as RequestHandler
);

// Remove Wishlist
router.delete(
  "/:courseId",
  authenticate,
  authorize("STUDENT"),
  wishlistController.removeWishlist as unknown as RequestHandler
);

export default router;