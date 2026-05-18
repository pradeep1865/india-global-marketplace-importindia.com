"use client";

import Link from "next/link";
import { Calculator, Home, Search, ShoppingCart, UserRound } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/logistics-calculator", label: "Logistics", icon: Calculator },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/account", label: "Account", icon: UserRound }
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white px-2 py-2 lg:hidden">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="focus-ring grid place-items-center gap-1 rounded-xl py-1 text-[11px] font-bold text-slate-600">
          <item.icon size={19} className="text-[#0b1f4d]" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
