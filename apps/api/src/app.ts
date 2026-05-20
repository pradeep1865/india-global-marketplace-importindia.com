import express from "express";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { catalogRouter } from "./modules/catalog/catalog.routes.js";
import { cloudRouter } from "./modules/cloud/cloud.routes.js";
import { commerceRouter } from "./modules/commerce/commerce.routes.js";
import { externalSuppliersRouter } from "./modules/external-suppliers/external-suppliers.routes.js";
import { paymentsRouter } from "./modules/payments/payments.routes.js";
import { searchRouter } from "./modules/search/search.routes.js";
import { applySecurity } from "./middleware/security.js";

export function createApp() {
  const app = express();
  applySecurity(app);
  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (_req, res) => res.json({ status: "ok", service: "importindia-api" }));
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/catalog", catalogRouter);
  app.use("/api/v1/external-suppliers", externalSuppliersRouter);
  app.use("/api/v1/cloud", cloudRouter);
  app.use("/api/v1/search", searchRouter);
  app.use("/api/v1", commerceRouter);
  app.use("/api/v1/payments", paymentsRouter);
  app.use("/api/v1/admin", adminRouter);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return res.status(500).json({ error: message });
  });

  return app;
}
