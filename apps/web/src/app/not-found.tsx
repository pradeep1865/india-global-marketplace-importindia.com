import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
      <section>
        <div className="text-8xl font-black text-[#ff9f1c]">404</div>
        <h1 className="mt-3 text-3xl font-black text-[#0b1f4d]">Page not found</h1>
        <Link href="/" className="focus-ring mt-6 inline-block rounded-full bg-[#0b1f4d] px-5 py-3 text-sm font-black text-white">
          Return Home
        </Link>
      </section>
    </main>
  );
}
