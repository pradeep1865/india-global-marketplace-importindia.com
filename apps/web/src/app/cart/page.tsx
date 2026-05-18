"use client";

import { AppShell } from "@/components/AppShell";
import { manufacturers } from "@/lib/mock-data";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export default function CartPage() {
  const { currency, currencyRates } = useMarketplaceStore();
  const subtotal = 1530 * 250;
  const shipping = 18500;
  const tax = Math.round(subtotal * 0.18);

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-[#0b1f4d]">Cart</h1>
          <div className="mt-5 space-y-4">
            {manufacturers.slice(0, 2).map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="font-black text-slate-900">{item.category} sample order</div>
                  <div className="text-sm text-slate-600">{item.name} · MOQ {item.moq}</div>
                </div>
                <input className="focus-ring w-24 rounded-xl border border-slate-200 px-3 py-2" defaultValue="100" aria-label="Quantity" />
                <button className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-bold">Save for later</button>
                <button className="focus-ring rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </section>
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-[#0b1f4d]">Checkout Summary</h2>
          <Summary label="Subtotal" value={formatMoneyFromInr(subtotal, currency.code, currencyRates)} />
          <Summary label="Shipping estimate" value={formatMoneyFromInr(shipping, currency.code, currencyRates)} />
          <Summary label="GST / tax estimate" value={formatMoneyFromInr(tax, currency.code, currencyRates)} />
          <Summary label="Total" value={formatMoneyFromInr(subtotal + shipping + tax, currency.code, currencyRates)} strong />
          <button className="focus-ring mt-6 w-full rounded-full bg-[#0b1f4d] px-4 py-3 text-sm font-black text-white">Continue to Payment</button>
          <p className="mt-3 text-xs leading-5 text-slate-500">Razorpay, UPI, cards, net banking, wallets, and Stripe-ready payment orchestration.</p>
        </aside>
      </div>
    </AppShell>
  );
}

function Summary({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`mt-4 flex justify-between border-t border-slate-100 pt-4 ${strong ? "text-lg font-black text-[#0b1f4d]" : "text-sm font-bold text-slate-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
