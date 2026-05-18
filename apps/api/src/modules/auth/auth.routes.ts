import argon2 from "argon2";
import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { requireAuth } from "../../middleware/auth.js";
import { issueTokens } from "../../utils/tokens.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post("/login", async (req, res) => {
  const input = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: input.email }, include: { buyer: true, manufacturer: true, addresses: true } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  if (user.accountStatus === "LOCKED") return res.status(423).json({ error: "Account locked. Contact admin." });
  if (user.role === "MANUFACTURER" && user.manufacturer?.verificationStatus !== "APPROVED") {
    return res.status(403).json({ error: "Manufacturer account pending admin approval" });
  }

  const valid = await argon2.verify(user.passwordHash, input.password);
  if (!valid) {
    const failedAttempts = user.failedAttempts + 1;
    await prisma.user.update({
      where: { id: user.id },
      data: { failedAttempts, accountStatus: failedAttempts >= 5 ? "LOCKED" : user.accountStatus }
    });
    return res.status(401).json({ error: "Invalid credentials" });
  }

  await prisma.user.update({ where: { id: user.id }, data: { failedAttempts: 0 } });
  const tokens = issueTokens({ id: user.id, role: user.role });
  res.cookie("accessToken", tokens.accessToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      buyer: user.buyer,
      manufacturer: user.manufacturer,
      addresses: user.addresses
    },
    ...tokens
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      buyer: true,
      manufacturer: true,
      addresses: true
    }
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      buyer: user.buyer,
      manufacturer: user.manufacturer,
      addresses: user.addresses
    }
  });
});

authRouter.post("/register/buyer", async (req, res) => {
  const input = z
    .object({
      fullName: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      dob: z.string().optional(),
      country: z.string().min(2),
      state: z.string().optional(),
      city: z.string().optional(),
      addressLine: z.string().optional(),
      location: z.string().min(2),
      phoneCountryCode: z.string().optional(),
      phone: z.string().min(6)
    })
    .parse(req.body);

  const passwordHash = await argon2.hash(input.password);
  const user = await prisma.user.create({
    data: {
      role: "BUYER",
      email: input.email,
      passwordHash,
      accountStatus: "PENDING_EMAIL",
      buyer: {
        create: {
          fullName: input.fullName,
          dob: input.dob ? new Date(input.dob) : undefined,
          country: input.country,
          location: input.location,
          phone: input.phone
        }
      },
      addresses: {
        create: input.addressLine
          ? [
              {
                addressLine: input.addressLine,
                city: input.city || input.location,
                state: input.state || "",
                country: input.country,
                zipCode: ""
              }
            ]
          : undefined
      }
    },
    include: { buyer: true }
  });
  return res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      buyer: user.buyer
    }
  });
});

authRouter.post("/register/manufacturer", async (req, res) => {
  const input = z
    .object({
      companyName: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      registrationNumber: z.string().min(2),
      companyLocation: z.string().min(2),
      companyCountry: z.string().min(2),
      companyState: z.string().optional(),
      companyCity: z.string().optional(),
      companyAddressLine: z.string().optional(),
      phoneCountryCode: z.string().optional(),
      companyPhone: z.string().min(6)
    })
    .parse(req.body);

  const passwordHash = await argon2.hash(input.password);
  const user = await prisma.user.create({
    data: {
      role: "MANUFACTURER",
      email: input.email,
      passwordHash,
      accountStatus: "PENDING_ADMIN_APPROVAL",
      manufacturer: {
        create: {
          companyName: input.companyName,
          registrationNumber: input.registrationNumber,
          companyLocation: input.companyLocation,
          companyCountry: input.companyCountry,
          companyPhone: input.companyPhone
        }
      },
      addresses: {
        create: input.companyAddressLine
          ? [
              {
                addressLine: input.companyAddressLine,
                city: input.companyCity || input.companyLocation,
                state: input.companyState || "",
                country: input.companyCountry,
                zipCode: ""
              }
            ]
          : undefined
      }
    },
    include: { manufacturer: true }
  });
  return res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus,
      manufacturer: user.manufacturer
    }
  });
});

authRouter.post("/refresh", (_req, res) => res.json({ message: "Refresh token rotation boundary" }));
authRouter.post("/logout", (_req, res) => res.clearCookie("accessToken").clearCookie("refreshToken").json({ ok: true }));
authRouter.post("/forgot-password", (_req, res) => res.json({ message: "Password reset email queued" }));
authRouter.post("/verify-email", (_req, res) => res.json({ message: "Email verification boundary" }));
authRouter.post("/otp/request", (_req, res) => res.json({ message: "OTP request queued" }));
authRouter.post("/otp/verify", (_req, res) => res.json({ message: "OTP verification boundary" }));
authRouter.get("/oauth/google", (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: `${env.API_URL ?? "http://localhost:4000"}/api/v1/auth/oauth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent"
  });
  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

authRouter.get("/oauth/google/callback", (_req, res) => {
  return res.redirect(`${env.WEB_URL}/login?oauth=google&status=pending-provider-exchange`);
});

authRouter.get("/oauth/facebook", (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID ?? "",
    redirect_uri: `${env.API_URL ?? "http://localhost:4000"}/api/v1/auth/oauth/facebook/callback`,
    response_type: "code",
    scope: "email,public_profile"
  });
  return res.redirect(`https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`);
});

authRouter.get("/oauth/facebook/callback", (_req, res) => {
  return res.redirect(`${env.WEB_URL}/login?oauth=facebook&status=pending-provider-exchange`);
});
