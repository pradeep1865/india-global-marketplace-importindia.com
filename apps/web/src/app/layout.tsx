import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haylix.com"),
  title: {
    default: "Haylix | Global Manufacturer Marketplace",
    template: "%s | Haylix"
  },
  description:
    "Discover verified manufacturers, compare products, request quotes, and source globally from Haylix.",
  keywords: ["manufacturers", "India export", "B2B marketplace", "global sourcing"],
  openGraph: {
    title: "Haylix",
    description: "Premium B2B/B2C global manufacturer marketplace.",
    url: "https://haylix.com",
    siteName: "Haylix",
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
    <html lang="en" data-theme="trade">
      <body>{children}</body>
    </html>
  );
}
