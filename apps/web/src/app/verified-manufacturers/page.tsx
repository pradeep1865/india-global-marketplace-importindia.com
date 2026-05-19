import { BadgeCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { GuestPrompt } from "@/components/GuestPrompt";
import { manufacturers } from "@/lib/mock-data";

export default function VerifiedManufacturersPage() {
  const verifiedManufacturers = manufacturers.filter((manufacturer) => manufacturer.verified);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
            <BadgeCheck size={26} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">Approved suppliers</p>
            <h1 className="text-3xl font-black text-[#0b1f4d]">Verified Electronics Manufacturers</h1>
          </div>
        </div>

        <div className="space-y-4">
          {verifiedManufacturers.map((manufacturer) => (
            <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
          ))}
        </div>
      </main>
      <GuestPrompt />
    </>
  );
}
