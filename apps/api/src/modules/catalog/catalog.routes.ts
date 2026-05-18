import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export const catalogRouter = Router();

catalogRouter.get("/home-feed", async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { isPublished: true, manufacturer: { verificationStatus: "APPROVED" } },
    include: { manufacturer: true, media: true, category: true, pricingTiers: true },
    take: 24,
    orderBy: { createdAt: "desc" }
  });
  return res.json({ products, nextCursor: null });
});

catalogRouter.get("/products", async (req, res) => {
  const products = await prisma.product.findMany({
    where: req.query.category ? { categoryId: String(req.query.category) } : undefined,
    include: { media: true, category: true, manufacturer: true },
    take: 30
  });
  return res.json({ products });
});

catalogRouter.get("/products/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: String(req.params.id) },
    include: { media: true, category: true, manufacturer: true, pricingTiers: true }
  });
  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.json({ product });
});

catalogRouter.post("/products", requireAuth, requireRole(["MANUFACTURER", "ADMIN", "SUPER_ADMIN"]), async (req, res) => {
  const input = z
    .object({
      shortName: z.string().min(2),
      description: z.string().min(20),
      categoryId: z.string(),
      basePrice: z.number().positive(),
      moq: z.number().int().positive(),
      availableDays: z.number().int().positive(),
      stock: z.number().int().nonnegative(),
      tags: z.array(z.string()).default([])
    })
    .parse(req.body);

  const product = await prisma.product.create({
    data: {
      ...input,
      manufacturerId: req.user!.id,
      basePrice: input.basePrice
    }
  });
  return res.status(201).json({ product });
});

catalogRouter.post("/products/:id/media/sign-upload", requireAuth, requireRole(["MANUFACTURER", "ADMIN", "SUPER_ADMIN"]), (_req, res) => {
  return res.json({ uploadUrl: "s3-or-cloudinary-signed-url-boundary", expiresIn: 300 });
});

catalogRouter.get("/manufacturer/products", requireAuth, requireRole(["MANUFACTURER", "ADMIN", "SUPER_ADMIN"]), async (req, res) => {
  const products = await prisma.product.findMany({
    where: req.user!.role === "MANUFACTURER" ? { manufacturerId: req.user!.id } : undefined,
    include: { media: true, category: true, pricingTiers: true },
    orderBy: { updatedAt: "desc" }
  });
  return res.json({ products });
});

catalogRouter.patch("/products/:id/inventory", requireAuth, requireRole(["MANUFACTURER", "ADMIN", "SUPER_ADMIN"]), async (req, res) => {
  const input = z.object({ stock: z.number().int().nonnegative(), availableDays: z.number().int().positive().optional() }).parse(req.body);
  const product = await prisma.product.update({
    where: { id: String(req.params.id) },
    data: input
  });
  return res.json({ product });
});

catalogRouter.get("/manufacturers", async (_req, res) => {
  const manufacturers = await prisma.manufacturer.findMany({
    where: { verificationStatus: "APPROVED" },
    include: { products: { take: 4, include: { media: true, category: true } }, reviews: true }
  });
  return res.json({ manufacturers });
});
