import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { GuestPrompt } from "@/components/GuestPrompt";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { categories, manufacturers } from "@/lib/mock-data";

export default function HomePage() {
  const feed = Array.from({ length: 5 }, () => manufacturers).flat();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl gap-6 px-4 pb-24 pt-6">
        <Sidebar />
        <section className="min-w-0 flex-1">
          <HomeHeroSlider />

          <div id="categories" className="mb-5 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button key={category} className="focus-ring shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                {category}
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#0b1f4d]">Manufacturer Feed</h2>
              <p className="text-sm text-slate-600">Infinite-scroll ready list with lazy product media, ranking, and personalization hooks.</p>
            </div>
            <select className="focus-ring rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700" aria-label="Sort manufacturers">
              <option>Best match</option>
              <option>Fastest delivery</option>
              <option>Highest rated</option>
              <option>Lowest MOQ</option>
            </select>
          </div>

          <div className="space-y-4">
            {feed.map((manufacturer, index) => (
              <ManufacturerCard key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
            ))}
          </div>
        </section>
      </main>
      <GuestPrompt />
      <MobileBottomNav />
    </>
  );
}
