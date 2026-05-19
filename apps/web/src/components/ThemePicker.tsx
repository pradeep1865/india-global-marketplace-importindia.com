"use client";

import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import { themes } from "@/lib/themes";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function ThemePicker() {
  const { themeId, hydrateTheme, setTheme } = useMarketplaceStore();
  const [open, setOpen] = useState(false);
  const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];

  useEffect(() => {
    hydrateTheme();
  }, [hydrateTheme]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/75 px-3 py-2 text-xs font-black text-[#0b1f4d] shadow-sm backdrop-blur-xl transition hover:bg-white"
        aria-label="Choose page theme"
        aria-expanded={open}
      >
        <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${activeTheme.swatch} ring-1 ring-slate-200`} />
        <Palette size={16} />
        <span className="hidden xl:inline">Theme</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/60 bg-white/90 p-3 text-slate-900 shadow-2xl backdrop-blur-2xl">
          <div className="mb-3 px-2">
            <div className="text-sm font-black text-[#0b1f4d]">Choose background</div>
            <div className="text-xs font-semibold text-slate-500">Personalize the marketplace workspace.</div>
          </div>
          <div className="grid gap-2">
            {themes.map((theme) => {
              const active = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setOpen(false);
                  }}
                  className={`focus-ring flex items-center gap-3 rounded-xl border p-2 text-left transition ${
                    active ? "border-[#ff9f1c] bg-[#ff9f1c]/10" : "border-slate-200 bg-white/70 hover:bg-white"
                  }`}
                >
                  <span className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${theme.swatch} ring-1 ring-slate-200`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black text-[#0b1f4d]">{theme.name}</span>
                    <span className="block text-xs font-semibold text-slate-500">{theme.description}</span>
                  </span>
                  {active ? <Check size={18} className="text-emerald-600" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
