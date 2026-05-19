import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { GuestPrompt } from "@/components/GuestPrompt";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MarketplaceHome } from "@/components/MarketplaceHome";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl gap-6 px-4 pb-24 pt-6">
        <Sidebar />
        <MarketplaceHome />
      </main>
      <GuestPrompt />
      <MobileBottomNav />
    </>
  );
}
