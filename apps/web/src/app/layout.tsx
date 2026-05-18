import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://importindia.com"),
  title: {
    default: "ImportIndia.com | Global Manufacturer Marketplace",
    template: "%s | ImportIndia.com"
  },
  description:
    "Discover verified manufacturers, compare products, request quotes, and source globally from ImportIndia.com.",
  keywords: ["manufacturers", "India export", "B2B marketplace", "global sourcing"],
  openGraph: {
    title: "ImportIndia.com",
    description: "Premium B2B/B2C global manufacturer marketplace.",
    url: "https://importindia.com",
    siteName: "ImportIndia.com",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0b1f4d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
