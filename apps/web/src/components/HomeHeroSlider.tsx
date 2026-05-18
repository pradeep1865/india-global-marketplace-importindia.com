"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Globe2, PackageCheck, Ship, TrendingUp } from "lucide-react";

const slides = [
  {
    eyebrow: "Mumbai to the world",
    title: "Industrial exports moving through India’s busiest trade corridors.",
    copy: "Discover verified machinery, automotive, and electronics manufacturers ready for global shipment.",
    cta: "Source machinery",
    href: "/products/prod-cnc-gearbox",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=85",
    city: "Mumbai",
    metric: "₹400Cr",
    metricLabel: "monthly export demand"
  },
  {
    eyebrow: "Delhi NCR supply network",
    title: "Wholesale buyers meet certified textile and packaging exporters.",
    copy: "Compare MOQ tiers, request quotes, and build repeatable sourcing programs from one dashboard.",
    cta: "Browse textiles",
    href: "/products/prod-organic-bedsheet",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    city: "Delhi NCR",
    metric: "18K+",
    metricLabel: "verified suppliers"
  },
  {
    eyebrow: "Chennai and Bengaluru freight lanes",
    title: "Electronics, EV parts, and precision goods built for global buyers.",
    copy: "Use logistics estimates, secure checkout, and manufacturer chat to accelerate cross-border sourcing.",
    cta: "Explore EV parts",
    href: "/products/prod-ev-bms-kit",
    image:
      "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=1400&q=85",
    city: "Chennai",
    metric: "72",
    metricLabel: "countries served"
  }
];

const tradeRoutes = ["Mumbai", "Delhi NCR", "Chennai", "Bengaluru", "Kolkata", "Dubai", "Singapore", "Rotterdam"];

export function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mb-6 overflow-hidden rounded-3xl bg-[#0b1f4d] text-white shadow-xl">
      <div className="grid min-h-[430px] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase text-[#ff9f1c]">
              <Globe2 size={15} />
              Guest browsing enabled
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">ImportIndia.com</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
              Search verified manufacturers, compare MOQ pricing, calculate logistics, and move goods from Indian production hubs to global buyers.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <HeroStat label="Verified suppliers" value="18K+" />
              <HeroStat label="Countries served" value="72" />
              <HeroStat label="Quote SLA" value="< 4h" />
            </div>
            <div className="flex flex-wrap gap-2">
              {tradeRoutes.map((route) => (
                <span key={route} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[430px]">
          {slides.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt={`${item.city} export and import goods movement`}
              width={1400}
              height={1100}
              priority={index === 0}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-[#0b1f4d]/30" />
          <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/20 bg-white/90 p-4 text-[#0b1f4d] shadow-2xl backdrop-blur-xl md:inset-x-6 md:bottom-6 md:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c]/20 px-3 py-1 text-xs font-black uppercase text-[#0b1f4d]">
                <Ship size={15} />
                {slide.eyebrow}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                <BadgeCheck size={15} />
                Verified ad
              </span>
            </div>
            <h2 className="text-2xl font-black leading-tight">{slide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{slide.copy}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b1f4d] text-[#ff9f1c]">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div className="text-xl font-black">{slide.metric}</div>
                  <div className="text-xs font-bold text-slate-500">{slide.metricLabel}</div>
                </div>
              </div>
              <Link href={slide.href} className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#0b1f4d] px-4 py-2.5 text-sm font-black text-white">
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="absolute left-5 top-5 flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.city}
                onClick={() => setActive(index)}
                className={`focus-ring h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-[#ff9f1c]" : "w-2.5 bg-white/80"}`}
                aria-label={`Show ${item.city} advertisement`}
              />
            ))}
          </div>
          <div className="absolute right-5 top-5 hidden rounded-2xl border border-white/20 bg-white/90 p-3 text-[#0b1f4d] shadow-xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
              <PackageCheck size={15} />
              Live campaign
            </div>
            <div className="mt-1 text-sm font-black">{slide.city} export lane</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
      <div className="text-2xl font-black text-[#ff9f1c]">{value}</div>
      <div className="mt-1 text-xs font-bold text-blue-100">{label}</div>
    </div>
  );
}
