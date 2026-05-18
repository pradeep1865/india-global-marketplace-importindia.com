# Security Architecture

## Identity

- Passwords are hashed with Argon2id or bcrypt cost 12+.
- Access tokens are short lived JWTs.
- Refresh tokens are rotated, stored as hashed token families, and delivered in `HttpOnly`, `Secure`, `SameSite=Lax` cookies.
- Manufacturer login is denied until admin approval.
- Accounts lock after 5 failed attempts and require admin unlock.
- Role-based access control: `GUEST`, `BUYER`, `MANUFACTURER`, `ADMIN`, `SUPER_ADMIN`.

## Application Security

- Helmet security headers.
- CORS restricted by environment.
- Rate limiting backed by Redis in production.
- CSRF token checks for cookie-authenticated mutations.
- Zod validation at route boundaries.
- Prisma parameterization prevents SQL injection.
- DOMPurify or server-side sanitization for rich text fields.
- Signed upload URLs with media size/type enforcement.

## Operations

- Secrets live in managed secret stores, never in repository.
- Audit all admin actions in `admin_logs`.
- Payment webhooks verify provider signatures.
- PII fields can be encrypted at rest using application-level envelope encryption.
- Run dependency scanning, container scanning, and SAST in CI.
