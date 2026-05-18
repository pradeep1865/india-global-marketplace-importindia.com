"use client";

import { useEffect } from "react";
import { Coins } from "lucide-react";
import { currencyProfiles } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function CurrencyPicker() {
  const currency = useMarketplaceStore((state) => state.currency);
  const setCurrency = useMarketplaceStore((state) => state.setCurrency);

  useEffect(() => {
    window.localStorage.setItem("importindia.currency", currency.code);
  }, [currency]);

  return (
    <label className="focus-within:outline-[#ff9f1c] hidden items-center gap-2 rounded-full px-2 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 md:inline-flex">
      <Coins size={20} />
      <span className="sr-only">Choose currency</span>
      <select
        value={currency.code}
        onChange={(event) => setCurrency(event.target.value)}
        className="cursor-pointer bg-transparent text-xs font-bold text-slate-700 outline-none"
        aria-label="Choose currency"
      >
        {currencyProfiles.map((profile) => (
          <option key={profile.code} value={profile.code}>
            {profile.symbol} {profile.code} · {profile.country}
          </option>
        ))}
      </select>
    </label>
  );
}
