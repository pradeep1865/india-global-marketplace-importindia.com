import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";

const pages: Record<string, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "return-policy": "Return Policy",
  "shipping-policy": "Shipping Policy",
  "refund-policy": "Refund Policy",
  "manufacturer-guidelines": "Manufacturer Guidelines",
  "buyer-guidelines": "Buyer Guidelines",
  faq: "FAQ",
  careers: "Careers",
  blog: "Blog",
  "help-center": "Help Center",
  "support-ticket": "Support Ticket"
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = pages[slug];
  if (!title) notFound();

  return (
    <AppShell>
      <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="font-black uppercase text-[#ff9f1c]">ImportIndia.com</p>
        <h1 className="mt-3 text-4xl font-black text-[#0b1f4d]">{title}</h1>
        <p className="mt-5 leading-8 text-slate-600">
          This page is wired into the production information architecture and ready for legal, support, SEO, and editorial content. It follows the same responsive shell, metadata strategy, and accessible component rules as the marketplace.
        </p>
      </article>
    </AppShell>
  );
}
