"use client";

import { useEffect } from "react";
import { defaultCurrencyProfile } from "@/lib/currency";
import { useMarketplaceStore } from "@/store/marketplace-store";

type CurrencyRatesResponse = {
  rates: Record<string, number>;
  source: string;
  updatedAt: string;
};

export function CurrencyHydrator() {
  const setCurrency = useMarketplaceStore((state) => state.setCurrency);
  const setCurrencyRates = useMarketplaceStore((state) => state.setCurrencyRates);

  useEffect(() => {
    let cancelled = false;
    const savedCurrency = window.localStorage.getItem("importindia.currency");
    setCurrency(savedCurrency || defaultCurrencyProfile.code);

    async function loadRates() {
      try {
        const response = await fetch("/api/currency/rates", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as CurrencyRatesResponse;
        if (cancelled) return;

        setCurrencyRates({
          rates: data.rates,
          source: data.source,
          updatedAt: data.updatedAt
        });
      } catch {
        // Keep fallback INR conversion table if the provider is unavailable.
      }
    }

    void loadRates();

    return () => {
      cancelled = true;
    };
  }, [setCurrency, setCurrencyRates]);

  return null;
}
