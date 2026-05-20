"use client";

import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, electronicsSegments, manufacturers } from "@/lib/mock-data";
import { useMarketplaceStore, type SearchMode } from "@/store/marketplace-store";

const searchModes: Array<{ id: SearchMode; label: string; helper: string; placeholder: string }> = [
  { id: "all", label: "Everything", helper: "Companies, devices, tags, MOQ, certifications", placeholder: "Search products, manufacturers, MOQ, tags, country..." },
  { id: "company", label: "Company name", helper: "Manufacturer names, country, supplier tags", placeholder: "Search company name, country, supplier tag..." },
  { id: "devices", label: "Electronic devices", helper: "Device names, segments, product categories", placeholder: "Search laptops, VR hardware, adapters, bluetooth..." },
  { id: "details", label: "Device details", helper: "Descriptions, connectivity, use case, certification", placeholder: "Search CE, OEM, Bluetooth, industrial, photography..." },
  { id: "moq", label: "MOQ search", helper: "Minimum order quantity values", placeholder: "Search MOQ such as 50, 100, 500, 1000..." }
];

export function SearchBar() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { query, searchMode, setQuery, setSearchMode, setFilter, filters } = useMarketplaceStore();
  const activeMode = searchModes.find((mode) => mode.id === searchMode) ?? searchModes[0];
  const suggestions = useMemo(() => {
    const terms = [
      ...categories,
      ...electronicsSegments.map((segment) => segment.name),
      ...manufacturers.flatMap((item) => [
        item.name,
        ...item.tags,
        ...item.products.flatMap((product) => [product.shortName, product.segment, ...product.tags, ...product.connectivity])
      ])
    ];
    return terms.filter((term) => term.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  return (
    <div className="relative flex-1">
      <div className="flex min-h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-sm">
        <Search aria-hidden size={20} className="text-slate-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={activeMode.placeholder}
          className="focus-ring min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
          aria-label="Global marketplace search"
        />
        <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#0b1f4d] xl:inline">{activeMode.label}</span>
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          className="focus-ring rounded-full bg-[#0b1f4d] p-2 text-white"
          aria-label="Open search filters"
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>
      {filtersOpen ? (
        <div className="glass absolute left-0 right-0 top-14 z-40 rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Search filters</p>
              <h2 className="text-lg font-black text-[#0b1f4d]">Choose what the search should match</h2>
            </div>
            <button type="button" onClick={() => setFiltersOpen(false)} className="focus-ring rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-slate-600">
              Done
            </button>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {searchModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSearchMode(mode.id)}
                className={`focus-ring rounded-2xl border p-3 text-left ${
                  searchMode === mode.id ? "border-[#0b1f4d] bg-[#0b1f4d] text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="block text-sm font-black">{mode.label}</span>
                <span className={`mt-1 block text-xs font-bold ${searchMode === mode.id ? "text-blue-100" : "text-slate-500"}`}>{mode.helper}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-2xl bg-white p-3 md:grid-cols-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(event) => setFilter("verifiedOnly", event.target.checked)}
                className="h-4 w-4 accent-[#0b1f4d]"
              />
              Verified manufacturers only
            </label>
            <label className="text-sm font-bold text-slate-700">
              Max MOQ
              <input
                type="number"
                min={1}
                value={filters.maxMoq}
                onChange={(event) => setFilter("maxMoq", Number(event.target.value) || 1)}
                className="focus-ring mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="text-sm font-bold text-slate-700">
              Max delivery days
              <input
                type="number"
                min={1}
                value={filters.maxDeliveryDays}
                onChange={(event) => setFilter("maxDeliveryDays", Number(event.target.value) || 1)}
                className="focus-ring mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
          </div>
        </div>
      ) : null}
      {query && !filtersOpen ? (
        <div className="glass absolute left-0 right-0 top-14 z-30 rounded-2xl p-2">
          {suggestions.length ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="focus-ring flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setQuery(suggestion)}
              >
                <Sparkles size={15} className="text-[#ff9f1c]" />
                {suggestion}
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-slate-500">No exact match. Search is typo-tolerant in production.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
