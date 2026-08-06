import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});
router.get("/profile", authenticate, (req: any, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
router.post("/register", register);
router.post("/login", login);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/student",
  authenticate,
  authorize("STUDENT"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Student",
    });
  }
);


export default router;


