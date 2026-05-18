"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function GuestPrompt() {
  const { guestLoginPromptOpen, closeGuestPrompt } = useMarketplaceStore();

  if (!guestLoginPromptOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0b1f4d]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#0b1f4d]">Create your manufacturer account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Listings, quote requests, checkout, and manufacturer messaging require a verified account.
            </p>
          </div>
          <button onClick={closeGuestPrompt} className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/login" className="focus-ring rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-black text-[#0b1f4d]">
            Sign In
          </Link>
          <Link href="/register?type=manufacturer" className="focus-ring rounded-full bg-[#ff9f1c] px-4 py-3 text-center text-sm font-black text-[#0b1f4d]">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
