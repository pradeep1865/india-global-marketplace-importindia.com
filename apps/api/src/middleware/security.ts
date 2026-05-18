import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "../config/env.js";

export function applySecurity(app: Express) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(compression());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(
    cors({
      origin: env.WEB_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
  );
  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 600,
      standardHeaders: "draft-7",
      legacyHeaders: false
    })
  );
  app.use((req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
    return csrf({ cookie: { httpOnly: true, sameSite: "lax", secure: env.NODE_ENV === "production" } })(req, res, next);
  });
}
