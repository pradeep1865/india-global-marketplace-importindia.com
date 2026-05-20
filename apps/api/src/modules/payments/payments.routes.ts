import crypto from "node:crypto";
import { Router } from "express";
import { env } from "../../config/env.js";

export const paymentsRouter = Router();

paymentsRouter.post("/razorpay/create-order", (_req, res) => {
  return res.json({ provider: "razorpay", orderId: "rzp_order_boundary", status: "created" });
});

paymentsRouter.post("/razorpay/webhook", (req, res) => {
  const signature = req.header("x-razorpay-signature");
  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET ?? "missing")
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (env.NODE_ENV === "production" && signature !== expected) return res.status(400).json({ error: "Invalid signature" });
  return res.json({ received: true });
});

paymentsRouter.post("/upi/intent", (_req, res) => res.json({ intent: "upi://pay?pa=merchant@upi&pn=Emitrix" }));
paymentsRouter.post("/stripe/create-intent", (_req, res) => res.json({ provider: "stripe", clientSecret: "stripe_client_secret_boundary" }));
