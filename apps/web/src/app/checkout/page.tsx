"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { products } from "@/lib/mock-data";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export default function CheckoutPage() {
  const { currency, currencyRates } = useMarketplaceStore();
  const product = products[0];
  const subtotal = product.basePriceInr * product.moq;
  const shipping = 18500;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <Panel title="Shipping Address">
            <div className="grid gap-4 md:grid-cols-2">
              {["Company / buyer name", "Address line", "City", "State", "Country", "ZIP code", "Phone", "GST / tax ID"].map((field) => (
                <label key={field} className="block text-sm font-bold text-slate-700">
                  {field}
                  <input className="focus-ring mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
                </label>
              ))}
            </div>
          </Panel>
          <Panel title="Payment Method">
            <div className="grid gap-3 md:grid-cols-2">
              {["UPI", "Razorpay", "Credit / Debit Card", "Net Banking", "Wallets", "Stripe-ready"].map((method) => (
                <button key={method} className="focus-ring rounded-2xl border border-slate-200 p-4 text-left text-sm font-black text-[#0b1f4d] hover:border-[#ff9f1c]">
                  {method}
                </button>
              ))}
            </div>
          </Panel>
        </section>
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black text-[#0b1f4d]">Order Confirmation</h1>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="font-black text-slate-900">{product.shortName}</div>
            <div className="mt-1 text-sm text-slate-600">
              MOQ {product.moq.toLocaleString()} · {formatMoneyFromInr(product.basePriceInr, currency.code, currencyRates)} per unit
            </div>
          </div>
          <Line label="Subtotal" value={formatMoneyFromInr(subtotal, currency.code, currencyRates)} />
          <Line label="Shipping estimate" value={formatMoneyFromInr(shipping, currency.code, currencyRates)} />
          <Line label="GST / taxes" value={formatMoneyFromInr(tax, currency.code, currencyRates)} />
          <Line label="Total" value={formatMoneyFromInr(total, currency.code, currencyRates)} strong />
          <button className="focus-ring mt-6 w-full rounded-full bg-[#0b1f4d] px-4 py-3 text-sm font-black text-white">Pay securely</button>
          <p className="mt-3 text-xs leading-5 text-slate-500">Invoice generation, provider signature verification, and order-status events are handled by the API payment flow.</p>
        </aside>
      </div>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-black text-[#0b1f4d]">{title}</h2>
      {children}
    </section>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`mt-4 flex justify-between border-t border-slate-100 pt-4 ${strong ? "text-lg font-black text-[#0b1f4d]" : "text-sm font-bold text-slate-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
