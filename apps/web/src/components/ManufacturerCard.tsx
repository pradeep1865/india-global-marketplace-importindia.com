"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, Heart, MessageSquare, Star, TrendingUp } from "lucide-react";
import type { Manufacturer } from "@/lib/mock-data";
import Link from "next/link";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function ManufacturerCard({ manufacturer }: { manufacturer: Manufacturer }) {
  const { currency, currencyRates } = useMarketplaceStore();
  const formattedPrice = `From ${formatMoneyFromInr(manufacturer.priceInr, currency.code, currencyRates)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
        <div className="grid min-h-44 grid-cols-2 gap-2 overflow-hidden rounded-xl bg-slate-100">
          {manufacturer.images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={`${manufacturer.name} product`}
              width={320}
              height={320}
              className="h-full min-h-44 w-full object-cover"
            />
          ))}
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-[#0b1f4d]">{manufacturer.name}</h2>
            {manufacturer.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                <BadgeCheck size={14} /> Verified
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-slate-600">
            {manufacturer.category} · {manufacturer.country}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="MOQ" value={manufacturer.moq} />
            <Metric label="Pricing" value={formattedPrice} />
            <Metric label="Rating" value={`${manufacturer.rating}/5`} icon={<Star size={15} className="fill-[#ff9f1c] text-[#ff9f1c]" />} />
            <Metric label="Delivery" value={manufacturer.delivery} icon={<Clock size={15} className="text-[#0b1f4d]" />} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {manufacturer.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/products/${manufacturer.products[0]?.id ?? manufacturer.id}`}
            className="focus-ring mt-4 inline-flex rounded-full bg-[#ff9f1c] px-4 py-2 text-sm font-black text-[#0b1f4d]"
          >
            View Product
          </Link>
        </div>
        <div className="flex gap-2 md:flex-col">
          <button className="focus-ring rounded-full bg-[#0b1f4d] p-3 text-white" aria-label="Contact manufacturer">
            <MessageSquare size={19} />
          </button>
          <button className="focus-ring rounded-full border border-slate-200 p-3 text-slate-700" aria-label="Save to wishlist">
            <Heart size={19} />
          </button>
          <button className="focus-ring rounded-full border border-slate-200 p-3 text-slate-700" aria-label="Compare product">
            <TrendingUp size={19} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-sm font-black text-slate-900">{value}</div>
    </div>
  );
}
