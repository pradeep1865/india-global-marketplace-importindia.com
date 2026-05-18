"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Calculator, MessageSquare, ShoppingCart, Star } from "lucide-react";
import type { ProductWithManufacturer } from "@/lib/mock-data";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function ProductDetail({ product }: { product: ProductWithManufacturer }) {
  const { currency, currencyRates } = useMarketplaceStore();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={product.manufacturer.images[0]}
              alt={product.shortName}
              width={900}
              height={720}
              className="h-full min-h-80 w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase text-[#ff9f1c]">{product.category}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-[#0b1f4d]">{product.shortName}</h1>
            <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.manufacturer.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Metric label="MOQ" value={`${product.moq.toLocaleString()} units`} />
              <Metric label="Base price" value={formatMoneyFromInr(product.basePriceInr, currency.code, currencyRates)} />
              <Metric label="Stock" value={`${product.stock.toLocaleString()} units`} />
              <Metric label="Dispatch" value={`${product.availableDays} days`} />
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-emerald-600" />
            <h2 className="text-xl font-black text-[#0b1f4d]">{product.manufacturer.name}</h2>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-600">
            <Star className="fill-[#ff9f1c] text-[#ff9f1c]" size={16} />
            {product.manufacturer.rating}/5 · {product.manufacturer.country} · Delivery {product.manufacturer.delivery}
          </div>
          <div className="mt-5 grid gap-3">
            <Link href="/checkout" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#0b1f4d] px-4 py-3 text-sm font-black text-white">
              <ShoppingCart size={18} /> Add to cart and checkout
            </Link>
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-[#0b1f4d]">
              <MessageSquare size={18} /> Contact manufacturer
            </button>
            <Link href="/logistics-calculator" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-[#0b1f4d]">
              <Calculator size={18} /> Estimate logistics
            </Link>
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[#0b1f4d]">MOQ Pricing</h2>
          <div className="mt-4 space-y-2">
            {product.pricingTiers.map((tier) => (
              <div key={tier.moq} className="flex justify-between rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                <span>{tier.moq.toLocaleString()}+ units</span>
                <span>{formatMoneyFromInr(tier.priceInr, currency.code, currencyRates)}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 font-black text-slate-900">{value}</div>
    </div>
  );
}
