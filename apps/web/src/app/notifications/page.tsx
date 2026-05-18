import { AppShell } from "@/components/AppShell";

export default function NotificationsPage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-black text-[#0b1f4d]">Notifications Center</h1>
      <div className="mt-5 space-y-3">
        {["Quote request received", "Manufacturer verification approved", "Order moved to export docs"].map((message) => (
          <div key={message} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm">{message}</div>
        ))}
      </div>
    </AppShell>
  );
}
