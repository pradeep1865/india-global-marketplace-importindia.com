"use client";

import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { categories, electronicsSegments, manufacturers } from "@/lib/mock-data";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function SearchBar() {
  const { query, setQuery, language } = useMarketplaceStore();
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
          placeholder={language.searchPlaceholder}
          className="focus-ring min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
          aria-label="Global marketplace search"
        />
        <button className="focus-ring rounded-full bg-[#0b1f4d] p-2 text-white" aria-label="Open search filters">
          <SlidersHorizontal size={18} />
        </button>
      </div>
      {query ? (
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
