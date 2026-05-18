import { AppShell } from "@/components/AppShell";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { manufacturers } from "@/lib/mock-data";

export default function WishlistPage() {
  return (
    <AppShell>
      <h1 className="mb-5 text-3xl font-black text-[#0b1f4d]">Wishlist</h1>
      <ManufacturerCard manufacturer={manufacturers[0]} />
    </AppShell>
  );
}
