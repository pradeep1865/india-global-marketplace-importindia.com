"use client";

import { Calculator, CheckCircle2, Filter, Home, ListPlus, Shapes, SortAsc } from "lucide-react";
import Link from "next/link";
import { useMarketplaceStore } from "@/store/marketplace-store";

const nav = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Filters", icon: Filter, href: "#filters" },
  { label: "Sort", icon: SortAsc, href: "#sort" },
  { label: "Categories", icon: Shapes, href: "#categories" },
  { label: "Verified Manufacturers", icon: CheckCircle2, href: "/verified-manufacturers" },
  { label: "Transportation Cost Calculator", icon: Calculator, href: "/logistics-calculator" }
];

export function Sidebar() {
  const { openGuestPrompt } = useMarketplaceStore();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-72 shrink-0 overflow-auto border-r border-slate-200 pr-4 lg:block">
      <nav className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-white hover:shadow-sm"
          >
            <item.icon size={18} className="text-[#0b1f4d]" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/add-listing";
            } else {
              openGuestPrompt();
            }
          }}
          className="focus-ring flex w-full items-center gap-3 rounded-xl bg-[#0b1f4d] px-3 py-3 text-left text-sm font-black text-white"
        >
          <ListPlus size={18} className="text-[#ff9f1c]" />
          Add Your Listing
        </button>
      </nav>
    </aside>
  );
}
