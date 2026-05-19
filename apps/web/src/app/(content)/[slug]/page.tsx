import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactMessageForm } from "@/components/ContactMessageForm";
import { GuestPrompt } from "@/components/GuestPrompt";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Sidebar } from "@/components/Sidebar";

const pages: Record<string, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "company-policy": "Company Policy",
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

const featuredLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Company Policy", href: "/company-policy" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "Contact Us", href: "/contact-us" }
];

const pageContent: Record<string, { intro: string; sections: Array<{ title: string; body: string }> }> = {
  "about-us": {
    intro: "Haylix connects global buyers with verified Indian manufacturers, electronics suppliers, exporters, and trade-ready businesses.",
    sections: [
      { title: "What we build", body: "A B2B/B2C sourcing marketplace with verified manufacturer profiles, product discovery, pricing tiers, inquiry flows, order readiness, and admin-controlled trust workflows." },
      { title: "Who it serves", body: "International buyers, Indian exporters, procurement teams, small businesses, and manufacturers who need a credible digital storefront for global trade." },
      { title: "Trust model", body: "Manufacturer accounts, listings, and marketplace activity are designed to pass through verification, moderation, and operational review before scaling visibility." }
    ]
  },
  "company-policy": {
    intro: "Our company policy is designed around verified trade, transparent listings, buyer protection, and responsible marketplace operations.",
    sections: [
      { title: "Manufacturer conduct", body: "Manufacturers must provide accurate registration details, product specifications, MOQ, delivery timelines, pricing, tax details, and export documentation when requested." },
      { title: "Buyer conduct", body: "Buyers must use truthful contact details, submit genuine inquiries, respect quoted commercial terms, and complete payment or cancellation flows through approved marketplace channels." },
      { title: "Marketplace enforcement", body: "Haylix may hold listings, reject manufacturers, restrict accounts, or escalate suspicious payment, fraud, counterfeit, or misrepresentation signals to the admin team." }
    ]
  },
  "return-policy": {
    intro: "Returns are handled according to product category, supplier terms, order status, inspection results, and documented delivery condition.",
    sections: [
      { title: "Eligible returns", body: "Products may be return-eligible when the delivered goods are materially different from the approved listing, damaged in transit, short-shipped, or fail agreed quality checks." },
      { title: "Return request window", body: "Buyers should raise a return request from the order page as soon as an issue is identified, including photos, invoice details, shipment references, and reason codes." },
      { title: "Resolution", body: "The admin team may coordinate replacement, partial refund, full refund, manufacturer review, logistics claim, or listing moderation based on evidence." }
    ]
  },
  "contact-us": {
    intro: "Contact Haylix for sourcing support, manufacturer verification, order concerns, payment questions, listing review, or partnership inquiries.",
    sections: [
      { title: "Admin support", body: "Messages submitted here are saved into the admin inbox so the operations team can review buyer, manufacturer, listing, and policy requests." },
      { title: "Response scope", body: "Include product names, order IDs, company names, phone number, and any relevant screenshots or shipment details when available." }
    ]
  },
  "privacy-policy": {
    intro: "Haylix collects account, location, marketplace, payment, and communication data needed to operate a secure sourcing platform.",
    sections: [
      { title: "Data use", body: "Information is used for authentication, buyer-manufacturer matching, order processing, fraud prevention, support, personalization, analytics, and legal compliance." },
      { title: "Data protection", body: "The platform architecture is prepared for encrypted credentials, secure cookies, role-based access, rate limits, audit logs, and least-privilege operational access." }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = pages[slug];
  if (!title) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl gap-6 px-4 pb-24 pt-6">
        <Sidebar />
        <article className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-black uppercase text-[#ff9f1c]">Haylix</p>
          <h1 className="mt-3 text-4xl font-black text-[#0b1f4d]">{title}</h1>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Company pages">
            {featuredLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-black ${
                  item.href === `/${slug}` ? "bg-[#0b1f4d] text-white" : "border border-slate-200 bg-slate-50 text-[#0b1f4d] hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-5 leading-8 text-slate-600">{pageContent[slug]?.intro ?? "This page is wired into the production information architecture and ready for legal, support, SEO, and editorial content."}</p>
          <div className="mt-7 grid gap-4">
            {(pageContent[slug]?.sections ?? [{ title: "Marketplace standard", body: "Haylix keeps this information page available for users, search engines, legal review, and support workflows." }]).map((section) => (
              <section key={section.title} className="rounded-2xl bg-slate-50 p-5">
                <h2 className="text-lg font-black text-[#0b1f4d]">{section.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>
          {slug === "contact-us" ? <ContactMessageForm /> : null}
        </article>
      </main>
      <GuestPrompt />
      <MobileBottomNav />
    </>
  );
}
