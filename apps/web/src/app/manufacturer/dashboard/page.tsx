import { AppShell } from "@/components/AppShell";
import { ManufacturerDashboard } from "@/components/ManufacturerDashboard";

export default function ManufacturerDashboardPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="font-black uppercase text-[#ff9f1c]">Verified manufacturer console</p>
        <h1 className="mt-2 text-4xl font-black text-[#0b1f4d]">Manage products, inventory, orders, and export readiness.</h1>
      </div>
      <ManufacturerDashboard />
    </AppShell>
  );
}
