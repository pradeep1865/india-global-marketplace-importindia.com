"use client";

import { create } from "zustand";
import { defaultCurrencyProfile, fallbackInrRates, getCurrencyProfile, type CurrencyProfile } from "@/lib/currency";
import { defaultLanguageProfile, getLanguageProfile, type LanguageProfile } from "@/lib/locale";

export type GeoLocationState = {
  city: string;
  country: string;
  countryCode: string;
  source: string;
};

type MarketplaceState = {
  query: string;
  location: GeoLocationState;
  language: LanguageProfile;
  currency: CurrencyProfile;
  currencyRates: Record<string, number>;
  currencyRatesSource: string;
  currencyRatesUpdatedAt: string;
  guestLoginPromptOpen: boolean;
  setQuery: (query: string) => void;
  setLocation: (location: Partial<GeoLocationState>) => void;
  setLanguage: (languageCode: string) => void;
  setCurrency: (currencyCode: string) => void;
  setCurrencyRates: (payload: { rates: Record<string, number>; source: string; updatedAt: string }) => void;
  openGuestPrompt: () => void;
  closeGuestPrompt: () => void;
};

const defaultLocation: GeoLocationState = {
  city: "",
  country: "India",
  countryCode: "IN",
  source: "default"
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  query: "",
  location: defaultLocation,
  language: defaultLanguageProfile,
  currency: defaultCurrencyProfile,
  currencyRates: fallbackInrRates,
  currencyRatesSource: "fallback",
  currencyRatesUpdatedAt: "",
  guestLoginPromptOpen: false,
  setQuery: (query) => set({ query }),
  setLocation: (location) =>
    set((state) => ({
      location: { ...state.location, ...location }
    })),
  setLanguage: (languageCode) => set({ language: getLanguageProfile(languageCode) }),
  setCurrency: (currencyCode) => set({ currency: getCurrencyProfile(currencyCode) }),
  setCurrencyRates: (payload) =>
    set({
      currencyRates: payload.rates,
      currencyRatesSource: payload.source,
      currencyRatesUpdatedAt: payload.updatedAt
    }),
  openGuestPrompt: () => set({ guestLoginPromptOpen: true }),
  closeGuestPrompt: () => set({ guestLoginPromptOpen: false })
}));
