import { Router } from "express";
import { prisma } from "../../db/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export const commerceRouter = Router();

commerceRouter.get("/cart", requireAuth, requireRole(["BUYER"]), async (req, res) => {
  const cart = await prisma.cart.findMany({ where: { buyerId: req.user!.id }, include: { product: { include: { media: true } } } });
  return res.json({ cart });
});

commerceRouter.post("/cart/items", requireAuth, requireRole(["BUYER"]), async (req, res) => {
  const item = await prisma.cart.upsert({
    where: { buyerId_productId: { buyerId: req.user!.id, productId: req.body.productId } },
    update: { quantity: req.body.quantity },
    create: { buyerId: req.user!.id, productId: req.body.productId, quantity: req.body.quantity }
  });
  return res.status(201).json({ item });
});

commerceRouter.post("/checkout/quote", requireAuth, requireRole(["BUYER"]), (_req, res) => {
  return res.json({ subtotal: 1840, taxAmount: 331, shippingAmount: 220, totalAmount: 2391, currency: "USD" });
});

commerceRouter.post("/orders", requireAuth, requireRole(["BUYER"]), async (req, res) => {
  const order = await prisma.order.create({
    data: {
      buyerId: req.user!.id,
      taxAmount: req.body.taxAmount,
      shippingAmount: req.body.shippingAmount,
      totalAmount: req.body.totalAmount
    }
  });
  return res.status(201).json({ order });
});

commerceRouter.get("/orders", requireAuth, async (req, res) => {
  const where = req.user!.role === "BUYER" ? { buyerId: req.user!.id } : undefined;
  const orders = await prisma.order.findMany({ where, include: { items: true, payments: true }, orderBy: { createdAt: "desc" } });
  return res.json({ orders });
});
