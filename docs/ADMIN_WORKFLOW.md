# Admin Moderation Workflow

## Manufacturer Verification

1. Manufacturer registers and receives `PENDING_ADMIN_APPROVAL`.
2. Admin reviews company registration, phone, location, country, documents, and fraud signals.
3. Approval changes `manufacturers.verification_status` to `APPROVED`, sets `verified_at`, activates the user, and emits a notification.
4. Rejection leaves the account unable to sell and records the reason in audit metadata.

## Product Moderation

1. Manufacturer uploads product metadata and media.
2. Product remains unpublished until approved.
3. Admin reviews category, media, prohibited items, pricing consistency, MOQ, and shipping data.
4. Approved products are indexed into search.

## Account Unlock

Accounts lock after 5 failed login attempts. Admin unlock resets failed attempts to `0`, sets status to `ACTIVE`, and writes an `admin_logs` entry.

## Analytics

Admin dashboard monitors revenue, GMV, pending approvals, search analytics, fraud alerts, payment anomalies, growth, and moderation backlog.
