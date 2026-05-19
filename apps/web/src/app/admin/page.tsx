import { AppShell } from "@/components/AppShell";
import { AdminDashboardCards } from "@/components/DashboardCards";

export default function AdminPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="font-black uppercase text-[#ff9f1c]">Secure admin dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-[#0b1f4d]">Moderation, analytics, fraud, and marketplace operations.</h1>
      </div>
      <AdminDashboardCards />
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {["Admin profile", "Manufacturer verification", "Product moderation", "Payment monitoring", "Account unlocks", "Search analytics", "Revenue dashboard"].map((title) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-black text-[#0b1f4d]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Queue, audit log, risk signals, and approval actions are exposed through admin REST routes.</p>
            {title === "Admin profile" ? (
              <a href="/admin/profile" className="focus-ring mt-4 inline-block rounded-full bg-[#0b1f4d] px-4 py-2 text-xs font-black text-white">Open profile</a>
            ) : null}
            {title === "Manufacturer verification" ? (
              <a href="/admin/manufacturers" className="focus-ring mt-4 inline-block rounded-full bg-[#0b1f4d] px-4 py-2 text-xs font-black text-white">Open queue</a>
            ) : null}
            {title === "Product moderation" ? (
              <a href="/admin/moderation" className="focus-ring mt-4 inline-block rounded-full bg-[#0b1f4d] px-4 py-2 text-xs font-black text-white">Open queue</a>
            ) : null}
          </div>
        ))}
      </section>
    </AppShell>
  );
}
