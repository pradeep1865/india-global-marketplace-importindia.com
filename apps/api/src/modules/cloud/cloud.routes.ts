import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { createUploadIntent } from "./cloud.service.js";

export const cloudRouter = Router();

cloudRouter.post("/upload-intent", requireAuth, requireRole(["MANUFACTURER", "ADMIN", "SUPER_ADMIN"]), (req, res) => {
  const input = z
    .object({
      folder: z.enum(["products", "manufacturer-documents", "support-tickets"]).default("products"),
      fileName: z.string().min(1),
      contentType: z.string().min(3)
    })
    .parse(req.body);

  return res.json(createUploadIntent(input));
});
