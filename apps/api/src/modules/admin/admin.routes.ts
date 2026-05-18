import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole(["ADMIN", "SUPER_ADMIN"]));

adminRouter.get("/analytics", async (_req, res) => {
  const [users, products, orders, pendingManufacturers] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.manufacturer.count({ where: { verificationStatus: "PENDING" } })
  ]);
  return res.json({ users, products, orders, pendingManufacturers });
});

adminRouter.get("/manufacturers/pending", async (_req, res) => {
  const manufacturers = await prisma.manufacturer.findMany({ where: { verificationStatus: "PENDING" }, include: { user: true } });
  return res.json({ manufacturers });
});

adminRouter.post("/manufacturers/:id/approve", async (req, res) => {
  const manufacturer = await prisma.manufacturer.update({
    where: { userId: req.params.id },
    data: { verificationStatus: "APPROVED", verifiedAt: new Date(), user: { update: { accountStatus: "ACTIVE" } } }
  });
  await prisma.adminLog.create({ data: { action: "MANUFACTURER_APPROVED", performedBy: req.user!.id, metadata: { manufacturerId: req.params.id } } });
  return res.json({ manufacturer });
});

adminRouter.post("/manufacturers/:id/reject", async (req, res) => {
  const manufacturer = await prisma.manufacturer.update({
    where: { userId: req.params.id },
    data: { verificationStatus: "REJECTED", user: { update: { accountStatus: "SUSPENDED" } } }
  });
  await prisma.adminLog.create({ data: { action: "MANUFACTURER_REJECTED", performedBy: req.user!.id, metadata: { manufacturerId: req.params.id, reason: req.body.reason } } });
  return res.json({ manufacturer });
});

adminRouter.post("/users/:id/unlock", async (req, res) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { accountStatus: "ACTIVE", failedAttempts: 0 } });
  await prisma.adminLog.create({ data: { action: "USER_UNLOCKED", performedBy: req.user!.id, metadata: { userId: req.params.id } } });
  return res.json({ user });
});

adminRouter.get("/products/moderation", async (_req, res) => {
  const products = await prisma.product.findMany({ where: { isPublished: false }, include: { manufacturer: true, media: true } });
  return res.json({ products });
});

adminRouter.post("/products/:id/moderate", async (req, res) => {
  const publish = req.body.decision === "APPROVE";
  const product = await prisma.product.update({ where: { id: req.params.id }, data: { isPublished: publish } });
  await prisma.adminLog.create({ data: { action: publish ? "PRODUCT_APPROVED" : "PRODUCT_HELD", performedBy: req.user!.id, metadata: { productId: req.params.id } } });
  return res.json({ product });
});

adminRouter.get("/payments", async (_req, res) => res.json({ payments: [] }));
adminRouter.get("/fraud-alerts", async (_req, res) => res.json({ alerts: [] }));
adminRouter.get("/logs", async (_req, res) => res.json({ logs: await prisma.adminLog.findMany({ take: 100, orderBy: { timestamp: "desc" } }) }));
