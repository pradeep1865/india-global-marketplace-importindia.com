import Link from "next/link";
import { BadgeCheck, Ban, Eye, ShieldCheck } from "lucide-react";
import { manufacturers, products } from "@/lib/mock-data";

export function ManufacturerVerificationQueue() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-[#0b1f4d]" />
        <h1 className="text-3xl font-black text-[#0b1f4d]">Manufacturer Verification</h1>
      </div>
      <div className="mt-5 space-y-4">
        {manufacturers.map((manufacturer, index) => (
          <article key={manufacturer.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#0b1f4d]">{manufacturer.name}</h2>
                <p className="text-sm font-bold text-slate-600">
                  {manufacturer.country} · {manufacturer.category} · Registration #{`IN-${index + 1}8842-GST`}
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">Pending review</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {["Company docs", "Phone verified", "Export history", "Fraud score"].map((check) => (
                <div key={check} className="rounded-xl bg-white p-3 text-xs font-bold text-slate-600">
                  {check}
                  <div className="mt-1 font-black text-emerald-700">Pass</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">
                <BadgeCheck size={16} /> Approve
              </button>
              <button className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-600">
                <Ban size={16} /> Reject
              </button>
              <button className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-[#0b1f4d]">
                <Eye size={16} /> Review evidence
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductModerationQueue() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#0b1f4d]">Product Moderation</h1>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{["Listing", "Manufacturer", "Category", "MOQ", "Risk", "Actions"].map((heading) => <th key={heading} className="p-4 font-black">{heading}</th>)}</tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-100">
                <td className="p-4 font-black text-[#0b1f4d]">{product.shortName}</td>
                <td className="p-4">{product.manufacturer.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.moq.toLocaleString()}</td>
                <td className="p-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Low</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="focus-ring rounded-full border border-slate-200 px-3 py-2 text-xs font-black">View</Link>
                    <button className="focus-ring rounded-full bg-emerald-600 px-3 py-2 text-xs font-black text-white">Publish</button>
                    <button className="focus-ring rounded-full border border-red-200 px-3 py-2 text-xs font-black text-red-600">Hold</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
