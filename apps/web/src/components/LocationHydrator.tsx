"use client";

import { useEffect } from "react";
import { useMarketplaceStore, type GeoLocationState } from "@/store/marketplace-store";
import { defaultLanguageProfile } from "@/lib/locale";

export function LocationHydrator() {
  const setLocation = useMarketplaceStore((state) => state.setLocation);
  const setLanguage = useMarketplaceStore((state) => state.setLanguage);

  useEffect(() => {
    let cancelled = false;
    const savedLanguage = window.localStorage.getItem("importindia.language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      setLanguage(defaultLanguageProfile.languageCode);
    }

    async function detectLocation() {
      try {
        const response = await fetch("/api/geolocation", { cache: "no-store" });
        if (!response.ok) return;

        const location = (await response.json()) as GeoLocationState;
        if (cancelled) return;

        setLocation(location);
      } catch {
        // Keep the default India/English experience if the provider is unavailable.
      }
    }

    void detectLocation();

    return () => {
      cancelled = true;
    };
  }, [setLanguage, setLocation]);

  return null;
}
