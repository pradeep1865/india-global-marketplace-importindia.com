import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

export const externalSuppliersRouter = Router();

const sourceTypeSchema = z.enum(["PLATFORM_EXPORT", "APPROVED_API", "MANUAL_RESEARCH", "PARTNER_FEED"]).default("PLATFORM_EXPORT");

const externalProductSchema = z.object({
  sourceProductId: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  titleOriginal: z.string().min(1),
  titleEnglish: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  segment: z.string().optional(),
  brand: z.string().optional(),
  modelNumber: z.string().optional(),
  minMoq: z.number().int().positive().optional(),
  priceMin: z.number().nonnegative().optional(),
  priceMax: z.number().nonnegative().optional(),
  currency: z.string().default("CNY"),
  stock: z.number().int().nonnegative().optional(),
  leadTimeDays: z.number().int().positive().optional(),
  imageUrls: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  attributes: z.record(z.string(), z.unknown()).optional(),
  rawSnapshot: z.record(z.string(), z.unknown()).optional()
});

const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().optional(),
  certificateNumber: z.string().optional(),
  validUntil: z.string().datetime().optional(),
  documentUrl: z.string().url().optional()
});

const externalSupplierSchema = z.object({
  sourcePlatform: z.string().default("1688"),
  sourceType: sourceTypeSchema,
  sourceSupplierId: z.string().optional(),
  sourceStoreUrl: z.string().url().optional(),
  sourceProfileUrl: z.string().url().optional(),
  sourceSearchKeyword: z.string().optional(),
  originalLanguage: z.string().default("zh-CN"),
  companyNameOriginal: z.string().min(1),
  companyNameEnglish: z.string().optional(),
  legalName: z.string().optional(),
  businessLicenseNumber: z.string().optional(),
  registrationAddress: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().default("China"),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  contactPerson: z.string().optional(),
  contactRole: z.string().optional(),
  yearsActive: z.number().int().nonnegative().optional(),
  employeeCount: z.string().optional(),
  factorySize: z.string().optional(),
  annualRevenue: z.string().optional(),
  mainProducts: z.array(z.string()).default([]),
  electronicsSegments: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  exportMarkets: z.array(z.string()).default([]),
  moqSummary: z.string().optional(),
  minMoq: z.number().int().positive().optional(),
  priceRange: z.string().optional(),
  currency: z.string().default("CNY"),
  leadTimeDays: z.number().int().positive().optional(),
  sampleAvailable: z.boolean().optional(),
  oemAvailable: z.boolean().optional(),
  odmAvailable: z.boolean().optional(),
  tradeTerms: z.array(z.string()).default([]),
  paymentTerms: z.array(z.string()).default([]),
  shippingPorts: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  transactionLevel: z.string().optional(),
  responseRate: z.string().optional(),
  responseTime: z.string().optional(),
  badges: z.array(z.string()).default([]),
  rawSnapshot: z.record(z.string(), z.unknown()).optional(),
  products: z.array(externalProductSchema).default([]),
  certifications: z.array(certificationSchema).default([])
});

const importBatchSchema = z.object({
  sourcePlatform: z.string().default("1688"),
  sourceType: sourceTypeSchema,
  sourceUrl: z.string().url().optional(),
  segment: z.string().default("electronics"),
  notes: z.string().optional(),
  suppliers: z.array(externalSupplierSchema).min(1)
});

externalSuppliersRouter.get("/", async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const segment = String(req.query.segment ?? "").trim();
  const take = Math.min(Number(req.query.take ?? 30), 100);
  const suppliers = await (prisma as any).externalSupplier.findMany({
    where: {
      status: { in: ["REVIEW_REQUIRED", "APPROVED", "IMPORTED"] },
      ...(query
        ? {
            OR: [
              { companyNameOriginal: { contains: query, mode: "insensitive" } },
              { companyNameEnglish: { contains: query, mode: "insensitive" } },
              { mainProducts: { has: query } },
              { electronicsSegments: { has: query } }
            ]
          }
        : {}),
      ...(segment ? { electronicsSegments: { has: segment } } : {})
    },
    include: { products: { take: 6 }, certifications: true },
    take,
    orderBy: { updatedAt: "desc" }
  });
  return res.json({ suppliers });
});

externalSuppliersRouter.post(
  "/imports",
  requireAuth,
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  async (req, res) => {
    const input = importBatchSchema.parse(req.body);
    const batch = await (prisma as any).externalImportBatch.create({
      data: {
        sourcePlatform: input.sourcePlatform,
        sourceType: input.sourceType,
        sourceUrl: input.sourceUrl,
        segment: input.segment,
        submittedBy: req.user!.id,
        recordCount: input.suppliers.length,
        importedCount: input.suppliers.length,
        suppliers: {
          create: input.suppliers.map((supplier) => ({
            ...supplier,
            products: {
              create: supplier.products.map((product) => ({
                ...product,
                priceMin: product.priceMin,
                priceMax: product.priceMax
              }))
            },
            certifications: {
              create: supplier.certifications.map((certification) => ({
                ...certification,
                validUntil: certification.validUntil ? new Date(certification.validUntil) : undefined
              }))
            }
          }))
        }
      },
      include: { suppliers: { include: { products: true, certifications: true } } }
    });

    await (prisma as any).adminLog.create({
      data: {
        action: "EXTERNAL_SUPPLIER_IMPORT",
        performedBy: req.user!.id,
        metadata: {
          sourcePlatform: input.sourcePlatform,
          sourceType: input.sourceType,
          recordCount: input.suppliers.length
        }
      }
    });

    return res.status(201).json({ batch });
  }
);
