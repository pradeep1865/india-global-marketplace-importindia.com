# ImportIndia.com Architecture

## Product Goal

ImportIndia.com helps global buyers discover, compare, contact, and buy from verified Indian and international manufacturers. It supports guest discovery, buyer accounts, manufacturer onboarding, product management, cart/checkout, order management, moderation, analytics, and realtime communication.

## System Boundaries

- `apps/web`: Next.js storefront, manufacturer console, account flows, checkout, and secure admin dashboard.
- `apps/api`: Express REST API with versioned routes and service modules. Controllers remain thin and delegate business logic to services.
- `PostgreSQL`: source of truth for users, manufacturers, products, orders, payments, moderation, and admin logs.
- `Meilisearch`: fast product/manufacturer search with typo tolerance, filters, facets, and autocomplete.
- `Redis`: rate limit store, token/session metadata, notification fanout, background job coordination.
- `Object Storage`: S3 or Cloudinary for images/videos.
- `Socket.io`: realtime chat, notification center, order events.

## API Strategy

REST is the public API contract today. DTOs and service boundaries are intentionally GraphQL-compatible: all list endpoints accept cursor pagination, filter objects, and sparse include parameters.

## Key Workflows

1. Buyer browses as guest, searches products, filters manufacturers, and receives autocomplete suggestions.
2. Buyer creates an account, verifies email/OTP, adds products to cart, and checks out through Razorpay/UPI.
3. Manufacturer registers, remains pending until admin verifies company documents, then uploads products.
4. Admin reviews manufacturers, moderates listings, unlocks accounts, monitors payments, and audits fraud risk.
5. Search index receives product/manufacturer projection events after approved listing changes.

## Scalability Plan

- Split services by domain after traction: identity, catalog, search, order, payment, notification, admin.
- Use event outbox table for reliable indexing, email, SMS, invoice, and analytics jobs.
- Cache hot homepage/search filters at CDN and Redis layers.
- Keep media behind CDN with signed upload URLs and moderation metadata.
