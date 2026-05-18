import { AppShell } from "@/components/AppShell";

export default function ProductUploadPage() {
  const fields = ["Product short name", "Product description", "Category", "MOQ pricing structure", "Bulk discount pricing", "Delivery timeline", "Inventory count", "Shipping weight", "Tags / keywords"];

  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-[#0b1f4d]">Manufacturer Product Upload</h1>
        <div className="mt-5 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center font-bold text-slate-600">
          Drag images and videos here. Production uses signed S3 or Cloudinary uploads.
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field} className="block text-sm font-bold text-slate-700">
              {field}
              <input className="focus-ring mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
            </label>
          ))}
        </div>
        <button className="focus-ring mt-6 rounded-full bg-[#0b1f4d] px-6 py-3 text-sm font-black text-white">Submit for Moderation</button>
      </section>
    </AppShell>
  );
}
