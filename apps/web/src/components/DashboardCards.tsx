import { ArrowUpRight, BadgeCheck, CreditCard, PackageCheck, ShieldAlert, UsersRound } from "lucide-react";

const adminCards = [
  { label: "Pending verifications", value: "42", icon: BadgeCheck },
  { label: "GMV monitored", value: "₹23.2Cr", icon: CreditCard },
  { label: "Fraud alerts", value: "7", icon: ShieldAlert },
  { label: "Monthly growth", value: "18.6%", icon: UsersRound }
];

export function AdminDashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {adminCards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <card.icon className="text-[#0b1f4d]" />
            <ArrowUpRight className="text-emerald-600" size={18} />
          </div>
          <div className="mt-6 text-3xl font-black text-[#0b1f4d]">{card.value}</div>
          <div className="mt-1 text-sm font-bold text-slate-500">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

export function OrderTimeline() {
  const steps = ["Confirmed", "Packed", "Export docs", "In transit", "Delivered"];
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-[#0b1f4d]">Order Fulfillment</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="rounded-2xl bg-slate-50 p-4">
            <PackageCheck className={index < 3 ? "text-emerald-600" : "text-slate-400"} />
            <div className="mt-3 text-sm font-black text-slate-800">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
