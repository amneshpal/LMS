import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorize = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = String(req.user.role || "")
      .trim()
      .toUpperCase();

    const allowedRoles = roles.map((role) =>
      String(role).trim().toUpperCase()
    );

    console.log("========== AUTHORIZATION ==========");
    console.log("USER ID:", req.user.id);
    console.log("USER EMAIL:", req.user.email);
    console.log("USER ROLE:", req.user.role);
    console.log("NORMALIZED ROLE:", userRole);
    console.log("ALLOWED ROLES:", allowedRoles);
    console.log("===================================");

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Access denied",
      });
    }

    next();
  };
};