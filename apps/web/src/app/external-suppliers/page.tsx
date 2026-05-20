import { Database, FileCheck2, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { externalSupplierFields, externalSupplierSamples } from "@/lib/external-suppliers";

export default function ExternalSuppliersPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">External supplier intelligence</p>
            <h1 className="mt-2 text-4xl font-black text-[#0b1f4d]">Electronics supplier import center</h1>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Use this area to display permitted supplier exports, approved API feeds, partner feeds, or manually verified research from electronics marketplaces such as 1688. Imported records stay in review until an admin approves them for buyer-facing discovery.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-800">
            Bulk crawling is disabled. Upload or connect only data you are allowed to reuse.
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Panel icon={<Database />} title="Tables Added" text="External import batches, external suppliers, external products, and certifications now have dedicated relational tables." />
          <Panel icon={<FileCheck2 />} title="Admin Review" text="Each supplier supports imported, review required, approved, rejected, and archived states before being linked to a marketplace manufacturer." />
          <Panel icon={<ShieldAlert />} title="Source Safe" text="Every record stores source platform, source type, URL, raw snapshot, and last sync timestamp for auditability." />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#0b1f4d]">Captured Supplier Columns</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {externalSupplierFields.map((field) => (
            <span key={field} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700">
              {field}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4">
        {externalSupplierSamples.map((supplier) => (
          <article key={supplier.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f1c]">{supplier.sourcePlatform}</p>
                <h2 className="mt-2 text-2xl font-black text-[#0b1f4d]">{supplier.companyNameEnglish}</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">{supplier.companyNameOriginal} / {supplier.province}, {supplier.country}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">Review required</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <Metric label="MOQ" value={supplier.minMoq.toLocaleString("en-IN")} />
              <Metric label="Price Range" value={supplier.priceRange} />
              <Metric label="Lead Time" value={`${supplier.leadTimeDays} days`} />
              <Metric label="Rating" value={`${supplier.rating}/5`} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...supplier.mainProducts, ...supplier.capabilities, ...supplier.badges].map((item) => (
                <span key={item} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black text-slate-600">{item}</span>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>{["Product", "Segment", "MOQ", "Price", "Lead time"].map((heading) => <th key={heading} className="p-3 font-black">{heading}</th>)}</tr>
                </thead>
                <tbody>
                  {supplier.products.map((product) => (
                    <tr key={product.titleEnglish} className="border-t border-slate-100">
                      <td className="p-3 font-black text-[#0b1f4d]">{product.titleEnglish}</td>
                      <td className="p-3">{product.segment}</td>
                      <td className="p-3">{product.minMoq.toLocaleString("en-IN")}</td>
                      <td className="p-3">{product.priceRange}</td>
                      <td className="p-3">{product.leadTimeDays} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}

function Panel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-[#0b1f4d] text-white">{icon}</div>
      <h2 className="font-black text-[#0b1f4d]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 font-black text-slate-900">{value}</div>
    </div>
  );
}
