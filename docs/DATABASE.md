# Database Architecture

The Prisma schema in `apps/api/prisma/schema.prisma` implements the requested marketplace model with normalized users, buyer profiles, manufacturer profiles, products, product media, pricing tiers, carts, orders, returns, payments, addresses, search history, contact messages, notifications, admin logs, wishlist, and manufacturer reviews.

## Relationship Highlights

- `users` is the identity root for buyers, manufacturers, admins, and super admins.
- `buyers` and `manufacturers` are role-specific profile extensions with one-to-one user relationships.
- `manufacturers` own `products`; products belong to `categories`.
- `product_media` and `product_pricing_tiers` support multiple uploads and MOQ pricing.
- `orders` own `order_items`, `payments`, and `returns`.
- `admin_logs` records moderation, unlock, verification, and fraud actions.

## Indexing

- Product lookups index manufacturer and category.
- Cart and wishlist enforce one row per buyer/product pair.
- Email, manufacturer registration number, category name, and payment transaction id are unique.

## Future Hardening

- Add row-level data retention policies for PII.
- Add event outbox tables for search indexing, email, SMS, invoice generation, and analytics.
- Add partitioning to orders, logs, notifications, and search history once volume requires it.
