import { AppShell } from "@/components/AppShell";
import { OrderTimeline } from "@/components/DashboardCards";

export default function OrdersPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-black text-[#0b1f4d]">Orders</h1>
      <div className="my-5 flex gap-2 overflow-x-auto">
        {["Current Orders", "Completed Orders", "Returned Orders", "Cancelled Orders"].map((tab) => (
          <button key={tab} className="focus-ring shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700">
            {tab}
          </button>
        ))}
      </div>
      <OrderTimeline />
    </AppShell>
  );
}
