import { Router } from "express";
import { searchMarketplace } from "./search.service.js";

export const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
  const q = String(req.query.q ?? "");
  const filters = [
    req.query.country ? `country = "${req.query.country}"` : null,
    req.query.category ? `category = "${req.query.category}"` : null,
    req.query.verified ? `verified = ${req.query.verified === "true"}` : null
  ].filter(Boolean) as string[];

  const results = await searchMarketplace(q, filters);
  return res.json(results);
});

searchRouter.get("/suggest", async (req, res) => {
  const q = String(req.query.q ?? "");
  const results = await searchMarketplace(q);
  return res.json({ suggestions: results.hits.slice(0, 8) });
});

searchRouter.get("/history", (_req, res) => res.json({ history: [] }));
