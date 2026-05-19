"use client";

import { create } from "zustand";
import { defaultCurrencyProfile, fallbackInrRates, getCurrencyProfile, type CurrencyProfile } from "@/lib/currency";
import { defaultLanguageProfile, getLanguageProfile, type LanguageProfile } from "@/lib/locale";
import { defaultThemeId, isThemeId, type ThemeId } from "@/lib/themes";

export type GeoLocationState = {
  city: string;
  country: string;
  countryCode: string;
  source: string;
};

export type MarketplaceFilters = {
  verifiedOnly: boolean;
  maxMoq: number;
  minRating: number;
  maxDeliveryDays: number;
  priceMaxInr: number;
  connectivity: string[];
  useCase: string[];
  certification: string[];
};

export type MarketplaceSort = "best-match" | "fastest-delivery" | "highest-rated" | "lowest-moq" | "lowest-price";

type MarketplaceState = {
  query: string;
  location: GeoLocationState;
  language: LanguageProfile;
  currency: CurrencyProfile;
  currencyRates: Record<string, number>;
  currencyRatesSource: string;
  currencyRatesUpdatedAt: string;
  guestLoginPromptOpen: boolean;
  themeId: ThemeId;
  selectedCategoryGroup: string;
  selectedSegment: string;
  sortBy: MarketplaceSort;
  filters: MarketplaceFilters;
  likedProductIds: string[];
  setQuery: (query: string) => void;
  setLocation: (location: Partial<GeoLocationState>) => void;
  setLanguage: (languageCode: string) => void;
  setCurrency: (currencyCode: string) => void;
  setCurrencyRates: (payload: { rates: Record<string, number>; source: string; updatedAt: string }) => void;
  hydrateTheme: () => void;
  setTheme: (themeId: ThemeId) => void;
  setSelectedCategoryGroup: (category: string) => void;
  setSelectedSegment: (segment: string) => void;
  setSortBy: (sortBy: MarketplaceSort) => void;
  setFilter: <K extends keyof MarketplaceFilters>(key: K, value: MarketplaceFilters[K]) => void;
  toggleFilterValue: (key: "connectivity" | "useCase" | "certification", value: string) => void;
  resetFilters: () => void;
  hydrateLikes: (userId?: string) => void;
  toggleLike: (productId: string, userId?: string) => void;
  openGuestPrompt: () => void;
  closeGuestPrompt: () => void;
};

const defaultLocation: GeoLocationState = {
  city: "",
  country: "India",
  countryCode: "IN",
  source: "default"
};

const defaultFilters: MarketplaceFilters = {
  verifiedOnly: false,
  maxMoq: 25000,
  minRating: 0,
  maxDeliveryDays: 60,
  priceMaxInr: 100000,
  connectivity: [],
  useCase: [],
  certification: []
};

const likesKey = (userId?: string) => `importindia.likes.${userId || "guest"}`;
const themeKey = "importindia.theme";

function readLikes(userId?: string) {
  if (typeof window === "undefined") return [];
  try {
    return (JSON.parse(window.localStorage.getItem(likesKey(userId)) || "[]") as string[]) ?? [];
  } catch {
    return [];
  }
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  query: "",
  location: defaultLocation,
  language: defaultLanguageProfile,
  currency: defaultCurrencyProfile,
  currencyRates: fallbackInrRates,
  currencyRatesSource: "fallback",
  currencyRatesUpdatedAt: "",
  guestLoginPromptOpen: false,
  themeId: defaultThemeId,
  selectedCategoryGroup: "",
  selectedSegment: "",
  sortBy: "best-match",
  filters: defaultFilters,
  likedProductIds: [],
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
  hydrateTheme: () => {
    if (typeof window === "undefined") return;
    const savedTheme = window.localStorage.getItem(themeKey);
    const nextTheme = isThemeId(savedTheme) ? savedTheme : defaultThemeId;
    document.documentElement.dataset.theme = nextTheme;
    set({ themeId: nextTheme });
  },
  setTheme: (themeId) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(themeKey, themeId);
      document.documentElement.dataset.theme = themeId;
    }
    set({ themeId });
  },
  setSelectedCategoryGroup: (category) => set({ selectedCategoryGroup: category, selectedSegment: "" }),
  setSelectedSegment: (segment) => set({ selectedSegment: segment }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  toggleFilterValue: (key, value) =>
    set((state) => {
      const current = state.filters[key];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      return { filters: { ...state.filters, [key]: next } };
    }),
  resetFilters: () =>
    set({
      selectedCategoryGroup: "",
      selectedSegment: "",
      sortBy: "best-match",
      filters: defaultFilters
    }),
  hydrateLikes: (userId) => set({ likedProductIds: readLikes(userId) }),
  toggleLike: (productId, userId) =>
    set((state) => {
      const next = state.likedProductIds.includes(productId)
        ? state.likedProductIds.filter((id) => id !== productId)
        : [...state.likedProductIds, productId];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(likesKey(userId), JSON.stringify(next));
      }
      return { likedProductIds: next };
    }),
  openGuestPrompt: () => set({ guestLoginPromptOpen: true }),
  closeGuestPrompt: () => set({ guestLoginPromptOpen: false })
}));
