"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { electronicsCategoryGroups, electronicsSegments, products } from "@/lib/mock-data";
import { useMarketplaceStore } from "@/store/marketplace-store";

const connectivityOptions = Array.from(new Set(products.flatMap((product) => product.connectivity))).sort();
const useCaseOptions = Array.from(new Set(products.flatMap((product) => product.useCase))).sort();
const certificationOptions = Array.from(new Set(products.flatMap((product) => product.certification))).sort();

export function ElectronicsFilters() {
  const {
    selectedCategoryGroup,
    selectedSegment,
    filters,
    setSelectedCategoryGroup,
    setSelectedSegment,
    setFilter,
    toggleFilterValue,
    resetFilters
  } = useMarketplaceStore();

  const segmentOptions = selectedCategoryGroup
    ? electronicsSegments.filter((segment) => segment.parent === selectedCategoryGroup)
    : electronicsSegments;

  return (
    <aside id="filters" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#0b1f4d]" />
          <h2 className="text-lg font-black text-[#0b1f4d]">Electronics Filters</h2>
        </div>
        <button onClick={resetFilters} className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Reset filters">
          <RotateCcw size={17} />
        </button>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          Category
          <select
            value={selectedCategoryGroup}
            onChange={(event) => setSelectedCategoryGroup(event.target.value)}
            className="focus-ring rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">All electronics categories</option>
            {electronicsCategoryGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm font-bold text-slate-700">
          Segment
          <select
            value={selectedSegment}
            onChange={(event) => setSelectedSegment(event.target.value)}
            className="focus-ring rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">All matching segments</option>
            {segmentOptions.map((segment) => (
              <option key={segment.id} value={segment.name}>
                {segment.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(event) => setFilter("verifiedOnly", event.target.checked)}
            className="h-4 w-4 accent-[#0b1f4d]"
          />
          Verified manufacturers only
        </label>

        <RangeFilter label="Max MOQ" value={filters.maxMoq} min={50} max={25000} step={50} onChange={(value) => setFilter("maxMoq", value)} />
        <RangeFilter label="Max delivery days" value={filters.maxDeliveryDays} min={5} max={60} step={1} onChange={(value) => setFilter("maxDeliveryDays", value)} />
        <RangeFilter label="Max price INR" value={filters.priceMaxInr} min={100} max={100000} step={100} onChange={(value) => setFilter("priceMaxInr", value)} />

        <label className="grid gap-1 text-sm font-bold text-slate-700">
          Minimum rating
          <select
            value={filters.minRating}
            onChange={(event) => setFilter("minRating", Number(event.target.value))}
            className="focus-ring rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value={0}>Any rating</option>
            <option value={4.5}>4.5 and above</option>
            <option value={4.7}>4.7 and above</option>
            <option value={4.8}>4.8 and above</option>
          </select>
        </label>

        <ChipGroup label="Connectivity" options={connectivityOptions} selected={filters.connectivity} onToggle={(value) => toggleFilterValue("connectivity", value)} />
        <ChipGroup label="Use case" options={useCaseOptions} selected={filters.useCase} onToggle={(value) => toggleFilterValue("useCase", value)} />
        <ChipGroup label="Certification" options={certificationOptions} selected={filters.certification} onToggle={(value) => toggleFilterValue("certification", value)} />
      </div>
    </aside>
  );
}

function RangeFilter({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      <span className="flex items-center justify-between">
        {label}
        <span className="text-xs text-slate-500">{value.toLocaleString("en-IN")}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="accent-[#0b1f4d]" />
    </label>
  );
}

function ChipGroup({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-sm font-black text-slate-700">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`focus-ring rounded-full px-3 py-1.5 text-xs font-black ${
                active ? "bg-[#0b1f4d] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
