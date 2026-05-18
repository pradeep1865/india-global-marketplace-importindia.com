# ImportIndia.com Marketplace

ImportIndia.com is a production-oriented B2B/B2C global manufacturer marketplace scaffold inspired by Alibaba, IndiaMART, Amazon Business, and Shopify Marketplace.

## Stack

- Frontend: Next.js 16, React 19, TailwindCSS, Framer Motion, Zustand
- Backend: Node.js, Express 5, Prisma 7, PostgreSQL
- Search: Meilisearch-ready service boundary
- Realtime: Socket.io
- Auth: JWT access/refresh tokens, OAuth-ready Passport strategy boundaries
- Payments: Razorpay-first, UPI-ready, Stripe-ready provider interface
- Infra: Docker Compose, microservice-ready monorepo, GitHub Actions CI

## Repository Structure

```text
apps/
  web/      Next.js buyer, manufacturer, and admin experience
  api/      Express REST API, Prisma schema, auth, search, payments, realtime
docs/       Product, architecture, API, security, deployment, UX docs
packages/   Shared TypeScript and design config
```

## Quick Start

```bash
pnpm install
cp .env.example .env
docker compose up -d postgres redis meilisearch
pnpm db:generate
pnpm dev
```

Frontend runs at `http://localhost:3000`.
API runs at `http://localhost:4000`.

## Production Notes

This scaffold separates demo-ready UI from production integration boundaries. Before launch, connect OAuth providers, object storage, email/SMS providers, Razorpay webhooks, Meilisearch indexing jobs, and cloud secrets.
