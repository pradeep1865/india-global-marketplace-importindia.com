"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { manufacturers } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth-store";
import { useMarketplaceStore } from "@/store/marketplace-store";

export function WishlistClient() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { likedProductIds, hydrateLikes } = useMarketplaceStore();

  useEffect(() => {
    if (currentUser) hydrateLikes(currentUser.id);
  }, [currentUser, hydrateLikes]);

  const likedManufacturers = useMemo(
    () => manufacturers.filter((manufacturer) => manufacturer.products.some((product) => likedProductIds.includes(product.id))),
    [likedProductIds]
  );

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Heart className="mx-auto text-slate-300" size={42} />
        <h1 className="mt-4 text-3xl font-black text-[#0b1f4d]">Wishlist</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to save and view liked electronics suppliers.</p>
        <Link href="/login" className="focus-ring mt-5 inline-flex rounded-full bg-[#0b1f4d] px-5 py-3 text-sm font-black text-white">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-5 text-3xl font-black text-[#0b1f4d]">Wishlist</h1>
      {likedManufacturers.length ? (
        <div className="space-y-4">
          {likedManufacturers.map((manufacturer) => (
            <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <Heart className="mx-auto text-slate-300" size={42} />
          <h2 className="mt-4 text-xl font-black text-[#0b1f4d]">No liked items yet</h2>
          <p className="mt-2 text-sm text-slate-600">Tap the heart on any manufacturer card to store it here.</p>
          <Link href="/" className="focus-ring mt-5 inline-flex rounded-full bg-[#ff9f1c] px-5 py-3 text-sm font-black text-[#0b1f4d]">
            Browse electronics
          </Link>
        </div>
      )}
    </div>
  );
}
