"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { GuestPrompt } from "@/components/GuestPrompt";
import { electronicsSegments } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth-store";
import { useMarketplaceStore } from "@/store/marketplace-store";

type PendingListing = {
  id: string;
  manufacturerId: string;
  manufacturerName: string;
  productName: string;
  segment: string;
  priceInr: number;
  moq: number;
  stock: number;
  availableDays: number;
  description: string;
  imageUrl: string;
  status: "PENDING_ADMIN_APPROVAL" | "APPROVED" | "REJECTED";
  createdAt: string;
};

const pendingListingsKey = "importindia.pendingListings";

export default function AddListingPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const openGuestPrompt = useMarketplaceStore((state) => state.openGuestPrompt);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    segment: electronicsSegments[0]?.name ?? "",
    priceInr: "2500",
    moq: "100",
    stock: "5000",
    availableDays: "14",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description: ""
  });

  const manufacturerName = useMemo(() => currentUser?.companyName || currentUser?.fullName || "Guest manufacturer", [currentUser]);
  const canSubmit = currentUser?.role === "MANUFACTURER" || currentUser?.role === "BUYER";

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser) {
      openGuestPrompt();
      return;
    }

    const nextListing: PendingListing = {
      id: crypto.randomUUID(),
      manufacturerId: currentUser.id,
      manufacturerName,
      productName: form.productName,
      segment: form.segment,
      priceInr: Number(form.priceInr),
      moq: Number(form.moq),
      stock: Number(form.stock),
      availableDays: Number(form.availableDays),
      description: form.description,
      imageUrl: form.imageUrl,
      status: "PENDING_ADMIN_APPROVAL",
      createdAt: new Date().toISOString()
    };

    const current = JSON.parse(window.localStorage.getItem(pendingListingsKey) || "[]") as PendingListing[];
    window.localStorage.setItem(pendingListingsKey, JSON.stringify([nextListing, ...current]));
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Admin approval required</p>
          <h1 className="mt-2 text-3xl font-black text-[#0b1f4d]">Add Your Electronics Listing</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Submit a product for Emitrix moderation. Approved listings become visible after admin review.
          </p>
        </div>

        {!currentUser ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-black text-[#0b1f4d]">Sign in to submit a listing</h2>
            <p className="mt-2 text-sm text-slate-600">Listings need a user or manufacturer account so admin can verify ownership before publishing.</p>
            <button onClick={openGuestPrompt} className="focus-ring mt-5 rounded-full bg-[#0b1f4d] px-5 py-3 text-sm font-black text-white">
              Sign in or create account
            </button>
          </div>
        ) : submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
            <CheckCircle2 className="text-emerald-700" size={36} />
            <h2 className="mt-4 text-2xl font-black text-emerald-900">Listing sent to admin approval</h2>
            <p className="mt-2 text-sm text-emerald-800">Your listing is saved in the moderation queue. Admin can approve or reject it from the admin profile.</p>
            <Link href="/admin/profile" className="focus-ring mt-5 inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white">
              Open admin profile
            </Link>
          </div>
        ) : (
          <form onSubmit={submitListing} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Manufacturer
              <input value={manufacturerName} disabled className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Segment
              <select value={form.segment} onChange={(event) => updateField("segment", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm">
                {electronicsSegments.map((segment) => (
                  <option key={segment.id} value={segment.name}>
                    {segment.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Product short name
              <input required value={form.productName} onChange={(event) => updateField("productName", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Price in INR
              <input required type="number" min="1" value={form.priceInr} onChange={(event) => updateField("priceInr", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              MOQ
              <input required type="number" min="1" value={form.moq} onChange={(event) => updateField("moq", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Stock
              <input required type="number" min="1" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Delivery days
              <input required type="number" min="1" value={form.availableDays} onChange={(event) => updateField("availableDays", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Product image URL
              <input required value={form.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Description
              <textarea required rows={5} value={form.description} onChange={(event) => updateField("description", event.target.value)} className="focus-ring rounded-xl border border-slate-200 px-3 py-3 text-sm" />
            </label>
            <div className="md:col-span-2">
              <button
                disabled={!canSubmit}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-5 py-3 text-sm font-black text-[#0b1f4d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={17} />
                Submit for approval
              </button>
            </div>
          </form>
        )}
      </main>
      <GuestPrompt />
    </>
  );
}
