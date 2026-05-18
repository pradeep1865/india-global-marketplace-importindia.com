"use client";

import { AppShell } from "@/components/AppShell";
import { manufacturers } from "@/lib/mock-data";
import { formatMoneyFromInr } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export default function ComparePage() {
  const { currency, currencyRates } = useMarketplaceStore();

  return (
    <AppShell>
      <h1 className="mb-5 text-3xl font-black text-[#0b1f4d]">Compare Products</h1>
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{["Manufacturer", "Category", "MOQ", "Price", "Rating", "Delivery"].map((h) => <th key={h} className="p-4">{h}</th>)}</tr>
          </thead>
          <tbody>
            {manufacturers.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="p-4 font-black text-[#0b1f4d]">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.moq}</td>
                <td className="p-4">From {formatMoneyFromInr(item.priceInr, currency.code, currencyRates)}</td>
                <td className="p-4">{item.rating}</td>
                <td className="p-4">{item.delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
