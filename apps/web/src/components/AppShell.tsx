import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6">{children}</main>
      <MobileBottomNav />
    </>
  );
}
