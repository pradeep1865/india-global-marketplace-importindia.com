# API Endpoints

All endpoints are prefixed with `/api/v1`.

## Auth

- `POST /auth/register/buyer`
- `POST /auth/register/manufacturer`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/oauth/google`
- `POST /auth/oauth/facebook`
- `GET /auth/oauth/google`
- `GET /auth/oauth/google/callback`
- `GET /auth/oauth/facebook`
- `GET /auth/oauth/facebook/callback`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`
- `POST /auth/otp/request`
- `POST /auth/otp/verify`

## Catalog

- `GET /catalog/home-feed`
- `GET /catalog/products`
- `GET /catalog/products/:id`
- `POST /catalog/products`
- `PATCH /catalog/products/:id`
- `POST /catalog/products/:id/media/sign-upload`
- `GET /catalog/manufacturer/products`
- `PATCH /catalog/products/:id/inventory`
- `GET /catalog/manufacturers`
- `GET /catalog/manufacturers/:id`
- `POST /catalog/products/:id/reviews`

## External Supplier Imports

Use these endpoints for electronics supplier datasets you are permitted to reuse, such as platform exports, approved API feeds, partner feeds, or manually verified research. Do not use them for unauthorized bulk scraping.

- `GET /external-suppliers?q=&segment=&take=`
- `POST /external-suppliers/imports`
  - Roles: `ADMIN`, `SUPER_ADMIN`
  - Creates an import batch and nested external suppliers, products, and certifications.
  - Captures source platform, source type, source URLs, original and English company names, legal name, business license, registered address, contact details, years active, employee count, factory size, annual revenue, main products, electronics segments, OEM/ODM/sample support, MOQ, price range, lead time, trade/payment terms, shipping ports, ratings, badges, certifications, raw source snapshot, and moderation status.

## Search

- `GET /search?q=&country=&category=&minMoq=&verified=&cursor=`
- `GET /search/suggest?q=`
- `GET /search/history`
- `DELETE /search/history/:id`

## Commerce

- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:id`
- `DELETE /cart/items/:id`
- `POST /checkout/quote`
- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `POST /orders/:id/returns`

## Payments

- `POST /payments/razorpay/create-order`
- `POST /payments/razorpay/webhook`
- `POST /payments/upi/intent`
- `POST /payments/stripe/create-intent`

## Cloud

- `POST /cloud/upload-intent`

## Location Reference

- `GET /api/locations` from the web app returns country, phone code, state, and city rows for cascading signup selectors.

## Admin

- `GET /admin/analytics`
- `GET /admin/manufacturers/pending`
- `POST /admin/manufacturers/:id/approve`
- `POST /admin/manufacturers/:id/reject`
- `POST /admin/users/:id/unlock`
- `GET /admin/products/moderation`
- `POST /admin/products/:id/moderate`
- `GET /admin/payments`
- `GET /admin/fraud-alerts`
- `GET /admin/logs`

## Realtime Events

- `notification:new`
- `chat:message`
- `order:status`
- `manufacturer:verified`
