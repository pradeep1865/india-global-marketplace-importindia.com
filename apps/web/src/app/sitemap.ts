import type { MetadataRoute } from "next";

const staticPages = [
  "",
  "login",
  "register",
  "cart",
  "checkout",
  "orders",
  "account",
  "admin",
  "admin/manufacturers",
  "admin/moderation",
  "manufacturer/upload",
  "manufacturer/dashboard",
  "logistics-calculator",
  "wishlist",
  "compare",
  "about-us",
  "contact-us",
  "company-policy",
  "privacy-policy",
  "terms-and-conditions",
  "return-policy",
  "shipping-policy",
  "refund-policy",
  "manufacturer-guidelines",
  "buyer-guidelines",
  "faq",
  "careers",
  "blog",
  "help-center",
  "support-ticket"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `https://importindia.com/${page}`,
    lastModified: new Date()
  }));
}
