import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type AuthUser = {
  id: string;
  role: "BUYER" | "MANUFACTURER" | "ADMIN" | "SUPER_ADMIN";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken ?? req.header("authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Authentication required" });

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(roles: AuthUser["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
    return next();
  };
}
