"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, BarChart3, Boxes, PackagePlus, Truck } from "lucide-react";
import { products } from "@/lib/mock-data";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function ManufacturerDashboard() {
  const { currency, currencyRates } = useMarketplaceStore();
  const inventoryValue = products.reduce((sum, product) => sum + product.stock * product.basePriceInr, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Live products" value={products.length.toString()} icon={<Boxes />} />
        <Stat label="Inventory value" value={formatMoneyFromInr(inventoryValue, currency.code, currencyRates)} icon={<BarChart3 />} />
        <Stat label="Pending orders" value="18" icon={<Truck />} />
        <Stat label="Low stock alerts" value="3" icon={<AlertTriangle />} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#0b1f4d]">Inventory Management</h2>
            <p className="mt-1 text-sm text-slate-600">Update stock, pricing, MOQ tiers, dispatch days, and listing status.</p>
          </div>
          <Link href="/manufacturer/upload" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-4 py-3 text-sm font-black text-[#0b1f4d]">
            <PackagePlus size={18} /> Upload Product
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {["Product", "Category", "MOQ", "Base price", "Stock", "Dispatch", "Status", "Actions"].map((heading) => (
                  <th key={heading} className="p-4 font-black">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-4 font-black text-[#0b1f4d]">{product.shortName}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.moq.toLocaleString()}</td>
                  <td className="p-4">{formatMoneyFromInr(product.basePriceInr, currency.code, currencyRates)}</td>
                  <td className="p-4">
                    <input className="focus-ring w-24 rounded-xl border border-slate-200 px-3 py-2" defaultValue={product.stock} aria-label={`Stock for ${product.shortName}`} />
                  </td>
                  <td className="p-4">{product.availableDays} days</td>
                  <td className="p-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Published</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/products/${product.id}`} className="focus-ring rounded-full border border-slate-200 px-3 py-2 text-xs font-black">View</Link>
                      <button className="focus-ring rounded-full border border-slate-200 px-3 py-2 text-xs font-black">Save</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-[#0b1f4d]">{icon}</div>
      <div className="mt-5 text-3xl font-black text-[#0b1f4d]">{value}</div>
      <div className="mt-1 text-sm font-bold text-slate-500">{label}</div>
    </div>
  );
}
