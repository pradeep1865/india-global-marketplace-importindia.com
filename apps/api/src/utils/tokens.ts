import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser } from "../middleware/auth.js";

export function issueTokens(user: AuthUser) {
  const accessToken = jwt.sign(user, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: user.id, role: user.role }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
  return { accessToken, refreshToken };
}
