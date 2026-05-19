"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import { electronicsCategoryGroups, electronicsSegments } from "@/lib/mock-data";
import { useMarketplaceStore } from "@/store/marketplace-store";

type ElectronicsMegaPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function ElectronicsMegaPanel({ open, onClose }: ElectronicsMegaPanelProps) {
  const { selectedCategoryGroup, setSelectedCategoryGroup, setSelectedSegment } = useMarketplaceStore();
  const activeGroup = selectedCategoryGroup || electronicsCategoryGroups[0];
  const visibleSegments = electronicsSegments.filter((segment) => segment.parent === activeGroup);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/35 p-3 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true">
      <div className="mx-auto flex max-h-[88vh] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="hidden w-80 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 md:block">
          {electronicsCategoryGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedCategoryGroup(group)}
              className={`focus-ring flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-black transition ${
                activeGroup === group ? "border-l-4 border-[#0b1f4d] bg-white text-[#0b1f4d]" : "text-slate-700 hover:bg-white"
              }`}
            >
              <span>{group}</span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>

        <section className="min-w-0 flex-1 overflow-y-auto p-5 md:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Consumer Electronics</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">{activeGroup}</h2>
            </div>
            <button onClick={onClose} className="focus-ring rounded-full p-2 text-slate-700 hover:bg-slate-100" aria-label="Close categories">
              <X size={26} />
            </button>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-2 md:hidden">
            {electronicsCategoryGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedCategoryGroup(group)}
                className={`focus-ring shrink-0 rounded-full px-4 py-2 text-xs font-black ${
                  activeGroup === group ? "bg-[#0b1f4d] text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {visibleSegments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => {
                  setSelectedSegment(segment.name);
                  onClose();
                }}
                className="focus-ring group text-center"
              >
                <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 transition group-hover:-translate-y-1 group-hover:ring-[#ff9f1c]">
                  <Image src={segment.image} alt={segment.name} fill sizes="96px" className="object-cover" />
                </span>
                <span className="mt-3 block text-sm font-bold leading-tight text-slate-800">{segment.name}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setSelectedSegment("");
                onClose();
              }}
              className="focus-ring group text-center"
            >
              <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-slate-100 text-[#0b1f4d] ring-1 ring-slate-200 transition group-hover:-translate-y-1 group-hover:ring-[#ff9f1c]">
                <ArrowUpRight size={28} />
              </span>
              <span className="mt-3 block text-sm font-bold leading-tight text-slate-800">View all</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
