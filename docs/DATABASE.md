# Database Architecture

The Prisma schema in `apps/api/prisma/schema.prisma` implements the requested marketplace model with normalized users, buyer profiles, manufacturer profiles, products, product media, pricing tiers, carts, orders, returns, payments, addresses, search history, contact messages, notifications, admin logs, wishlist, and manufacturer reviews.

It also includes an external supplier intelligence model for permitted electronics supplier imports from sources such as platform exports, approved APIs, partner feeds, or manually verified research.

## Relationship Highlights

- `users` is the identity root for buyers, manufacturers, admins, and super admins.
- `buyers` and `manufacturers` are role-specific profile extensions with one-to-one user relationships.
- `manufacturers` own `products`; products belong to `categories`.
- `product_media` and `product_pricing_tiers` support multiple uploads and MOQ pricing.
- `orders` own `order_items`, `payments`, and `returns`.
- `admin_logs` records moderation, unlock, verification, and fraud actions.
- `external_import_batches` groups each permitted external dataset with source, submitter, record counts, and notes.
- `external_suppliers` captures rich supplier profile details including source URLs, original and English company names, legal/business registration, address, contact details, factory capacity, main products, electronics segments, capabilities, MOQ, price range, lead time, trade terms, ratings, badges, raw source snapshots, and moderation status.
- `external_supplier_products` stores external product-level details such as source URL, title, segment, MOQ, pricing, stock, lead time, image URLs, tags, attributes, and raw source snapshot.
- `external_supplier_certifications` stores supplier certificates and supporting document URLs.

## Indexing

- Product lookups index manufacturer and category.
- Cart and wishlist enforce one row per buyer/product pair.
- Email, manufacturer registration number, category name, and payment transaction id are unique.
- External supplier imports index source platform/source supplier id, company name, review status, product segment, and supplier relations.

## Future Hardening

- Add row-level data retention policies for PII.
- Add event outbox tables for search indexing, email, SMS, invoice generation, and analytics.
- Add partitioning to orders, logs, notifications, and search history once volume requires it.
