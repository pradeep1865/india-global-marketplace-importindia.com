"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Grid3X3, SearchX } from "lucide-react";
import { ElectronicsFilters } from "@/components/ElectronicsFilters";
import { ElectronicsMegaPanel } from "@/components/ElectronicsMegaPanel";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { electronicsCategoryGroups, electronicsSegments, manufacturers, type Manufacturer } from "@/lib/mock-data";
import { useMarketplaceStore, type MarketplaceFilters, type MarketplaceSort } from "@/store/marketplace-store";

const segmentParent = new Map(electronicsSegments.map((segment) => [segment.name, segment.parent]));

function matchesQuery(manufacturer: Manufacturer, query: string) {
  if (!query.trim()) return true;
  const normalized = query.toLowerCase().trim();
  const terms = [
    manufacturer.name,
    manufacturer.country,
    manufacturer.category,
    manufacturer.moq,
    ...manufacturer.tags,
    ...manufacturer.products.flatMap((product) => [
      product.shortName,
      product.description,
      product.category,
      product.segment,
      String(product.moq),
      ...product.tags,
      ...product.connectivity,
      ...product.useCase,
      ...product.certification
    ])
  ];
  return terms.some((term) => term.toLowerCase().includes(normalized));
}

function deliveryDays(manufacturer: Manufacturer) {
  return Math.min(...manufacturer.products.map((product) => product.availableDays));
}

function minMoq(manufacturer: Manufacturer) {
  return Math.min(...manufacturer.products.map((product) => product.moq));
}

function minPrice(manufacturer: Manufacturer) {
  return Math.min(...manufacturer.products.map((product) => product.basePriceInr));
}

function arrayMatches(selected: string[], values: string[]) {
  return selected.length === 0 || selected.some((item) => values.includes(item));
}

function filterManufacturers({
  query,
  selectedCategoryGroup,
  selectedSegment,
  filters,
  sortBy
}: {
  query: string;
  selectedCategoryGroup: string;
  selectedSegment: string;
  filters: MarketplaceFilters;
  sortBy: MarketplaceSort;
}) {
  const filtered = manufacturers.filter((manufacturer) => {
    const products = manufacturer.products;
    const hasMatchingProduct = products.some((product) => {
      const parent = segmentParent.get(product.segment);
      return (
        (!selectedCategoryGroup || parent === selectedCategoryGroup) &&
        (!selectedSegment || product.segment === selectedSegment) &&
        product.moq <= filters.maxMoq &&
        product.availableDays <= filters.maxDeliveryDays &&
        product.basePriceInr <= filters.priceMaxInr &&
        arrayMatches(filters.connectivity, product.connectivity) &&
        arrayMatches(filters.useCase, product.useCase) &&
        arrayMatches(filters.certification, product.certification)
      );
    });

    return (
      hasMatchingProduct &&
      matchesQuery(manufacturer, query) &&
      (!filters.verifiedOnly || manufacturer.verified) &&
      manufacturer.rating >= filters.minRating
    );
  });

  return filtered.sort((a, b) => {
    const sorters: Record<MarketplaceSort, number> = {
      "best-match": Number(b.verified) - Number(a.verified) || b.rating - a.rating,
      "fastest-delivery": deliveryDays(a) - deliveryDays(b),
      "highest-rated": b.rating - a.rating,
      "lowest-moq": minMoq(a) - minMoq(b),
      "lowest-price": minPrice(a) - minPrice(b)
    };
    return sorters[sortBy];
  });
}

export function MarketplaceHome() {
  const [categoryPanelOpen, setCategoryPanelOpen] = useState(false);
  const {
    query,
    selectedCategoryGroup,
    selectedSegment,
    sortBy,
    filters,
    setSelectedCategoryGroup,
    setSelectedSegment,
    setSortBy
  } = useMarketplaceStore();

  const filteredManufacturers = useMemo(
    () => filterManufacturers({ query, selectedCategoryGroup, selectedSegment, filters, sortBy }),
    [query, selectedCategoryGroup, selectedSegment, filters, sortBy]
  );

  return (
    <section className="min-w-0 flex-1">
      <HomeHeroSlider />

      <div id="categories" className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Consumer electronics only</p>
            <h2 className="text-xl font-black text-[#0b1f4d]">Browse category segments</h2>
          </div>
          <button
            onClick={() => setCategoryPanelOpen(true)}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#0b1f4d] px-4 py-2 text-sm font-black text-white"
          >
            <Grid3X3 size={17} />
            Open category view
          </button>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {electronicsCategoryGroups.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategoryGroup(category)}
              className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${
                selectedCategoryGroup === category ? "border-[#0b1f4d] bg-[#0b1f4d] text-white" : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {electronicsSegments.slice(0, 12).map((segment) => (
            <button
              key={segment.id}
              onClick={() => {
                setSelectedCategoryGroup(segment.parent);
                setSelectedSegment(segment.name);
              }}
              className={`focus-ring rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                selectedSegment === segment.name ? "border-[#ff9f1c] bg-[#ff9f1c]/10" : "border-slate-200 bg-slate-50"
              }`}
            >
              <span className="block text-sm font-black text-[#0b1f4d]">{segment.name}</span>
              <span className="mt-1 block text-xs font-bold text-slate-500">{segment.parent}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[310px_1fr]">
        <ElectronicsFilters />

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#0b1f4d]">Electronics Manufacturer Feed</h2>
              <p className="text-sm text-slate-600">
                {filteredManufacturers.length} result{filteredManufacturers.length === 1 ? "" : "s"}
                {query ? ` for "${query}"` : ""}.
              </p>
            </div>
            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as MarketplaceSort)}
              className="focus-ring rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
              aria-label="Sort manufacturers"
            >
              <option value="best-match">Best match</option>
              <option value="fastest-delivery">Fastest delivery</option>
              <option value="highest-rated">Highest rated</option>
              <option value="lowest-moq">Lowest MOQ</option>
              <option value="lowest-price">Lowest price</option>
            </select>
          </div>

          {filteredManufacturers.length ? (
            <div className="space-y-4">
              {filteredManufacturers.map((manufacturer) => (
                <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div>
                <SearchX className="mx-auto text-slate-400" size={40} />
                <h3 className="mt-4 text-xl font-black text-[#0b1f4d]">No electronics suppliers found</h3>
                <p className="mt-2 max-w-md text-sm text-slate-600">Try clearing a filter, widening MOQ or delivery limits, or searching a segment such as Bluetooth, VR, laptop parts, cable, or photography.</p>
                <button
                  onClick={() => setCategoryPanelOpen(true)}
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-4 py-2 text-sm font-black text-[#0b1f4d]"
                >
                  Browse segments
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ElectronicsMegaPanel open={categoryPanelOpen} onClose={() => setCategoryPanelOpen(false)} />
    </section>
  );
}
