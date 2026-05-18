# Payment Flow

## Checkout

1. Buyer requests `/api/v1/checkout/quote`.
2. API calculates subtotal, shipping estimate, GST/tax, duties, and final amount.
3. Buyer chooses UPI, Razorpay, card, net banking, wallet, or future COD.
4. API creates provider order or payment intent.
5. Provider webhook verifies signature and updates `payments` plus `orders.payment_status`.
6. Invoice and order confirmation jobs are queued.

## Providers

- Razorpay is the primary India-ready processor.
- UPI intent endpoint is reserved for deep-link flows.
- Stripe-ready endpoint supports international cards and future multi-currency settlement.

## Security

- Webhooks must verify provider signatures.
- Idempotency keys should wrap payment creation.
- Payment records store provider payloads in `raw_payload` for audit.
