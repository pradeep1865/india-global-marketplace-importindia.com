"use client";

import { useEffect } from "react";
import { Globe2 } from "lucide-react";
import { languageProfiles } from "@/lib/locale";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function LanguagePicker() {
  const language = useMarketplaceStore((state) => state.language);
  const setLanguage = useMarketplaceStore((state) => state.setLanguage);

  useEffect(() => {
    document.documentElement.lang = language.languageCode;
    document.documentElement.dir = language.direction;
    window.localStorage.setItem("importindia.language", language.languageCode);
  }, [language]);

  return (
    <label className="focus-within:outline-[#ff9f1c] hidden items-center gap-2 rounded-full px-2 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 md:inline-flex">
      <Globe2 size={20} />
      <span className="sr-only">Choose language</span>
      <select
        value={language.languageCode}
        onChange={(event) => setLanguage(event.target.value)}
        className="cursor-pointer bg-transparent text-xs font-bold text-slate-700 outline-none"
        aria-label="Choose display language"
      >
        {languageProfiles.map((profile) => (
          <option key={profile.languageCode} value={profile.languageCode}>
            {profile.language} ({profile.nativeName})
          </option>
        ))}
      </select>
    </label>
  );
}
