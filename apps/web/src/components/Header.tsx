"use client";

import Link from "next/link";
import { Bell, MapPin, ShoppingCart, UserRound } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { LocationHydrator } from "@/components/LocationHydrator";
import { LanguagePicker } from "@/components/LanguagePicker";
import { CurrencyHydrator } from "@/components/CurrencyHydrator";
import { CurrencyPicker } from "@/components/CurrencyPicker";
import { ThemePicker } from "@/components/ThemePicker";
import { AuthHydrator } from "@/components/AuthHydrator";
import { useMarketplaceStore } from "@/store/marketplace-store";
import { useAuthStore } from "@/store/auth-store";

export function Header() {
  const { location, language } = useMarketplaceStore();
  const currentUser = useAuthStore((state) => state.currentUser);
  const locationLabel = [location.city, location.country].filter(Boolean).join(", ");

  return (
    <header className="sticky top-0 z-40 border-b border-white/45 bg-white/72 shadow-sm backdrop-blur-2xl">
      <LocationHydrator />
      <CurrencyHydrator />
      <AuthHydrator />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-lg">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b1f4d] text-lg font-black text-[#ff9f1c]">II</span>
          <span className="hidden text-lg font-black text-[#0b1f4d] sm:block">ImportIndia.com</span>
        </Link>
        <SearchBar />
        <div className="hidden items-center gap-2 text-xs font-semibold text-slate-600 lg:flex">
          <MapPin size={16} className="text-[#ff9f1c]" />
          <span>{language.deliveryPrefix}: {locationLabel}</span>
        </div>
        <LanguagePicker />
        <CurrencyPicker />
        <ThemePicker />
        <Link href="/cart" className="focus-ring rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Cart">
          <ShoppingCart size={20} />
        </Link>
        <Link href="/notifications" className="focus-ring rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={20} />
        </Link>
        {currentUser ? (
          <Link href="/account" className="focus-ring hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 md:block">
            {currentUser.fullName || currentUser.companyName || "Account"}
          </Link>
        ) : (
          <>
            <Link href="/login" className="focus-ring hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#0b1f4d] md:block">
              Sign In
            </Link>
            <Link href="/register" className="focus-ring hidden rounded-full bg-[#ff9f1c] px-4 py-2 text-sm font-black text-[#0b1f4d] md:block">
              Create Account
            </Link>
          </>
        )}
        <Link href="/account" className="focus-ring rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Profile">
          <UserRound size={20} />
        </Link>
      </div>
    </header>
  );
}
