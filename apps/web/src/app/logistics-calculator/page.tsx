import { AppShell } from "@/components/AppShell";

export default function LogisticsCalculatorPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-[#0b1f4d]">Transportation Cost Calculator</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {["Origin country", "Destination country", "Weight (kg)", "Volume (CBM)", "Incoterm", "Shipping mode"].map((field) => (
            <label key={field} className="block text-sm font-bold text-slate-700">
              {field}
              <input className="focus-ring mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
            </label>
          ))}
        </div>
        <button className="focus-ring mt-6 rounded-full bg-[#ff9f1c] px-6 py-3 text-sm font-black text-[#0b1f4d]">Estimate shipping</button>
      </section>
    </AppShell>
  );
}
