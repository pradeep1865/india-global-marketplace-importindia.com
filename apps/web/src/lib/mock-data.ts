export type Manufacturer = {
  id: string;
  name: string;
  country: string;
  category: string;
  moq: string;
  priceInr: number;
  rating: number;
  delivery: string;
  verified: boolean;
  images: string[];
  tags: string[];
  products: Product[];
};

export type Product = {
  id: string;
  shortName: string;
  description: string;
  category: string;
  basePriceInr: number;
  moq: number;
  stock: number;
  availableDays: number;
  shippingWeight: string;
  pricingTiers: Array<{ moq: number; priceInr: number }>;
};

export const manufacturers: Manufacturer[] = [
  {
    id: "mfg-001",
    name: "Aarav Precision Components",
    country: "India",
    category: "Industrial Machinery",
    moq: "250 units",
    priceInr: 1530,
    rating: 4.9,
    delivery: "12-18 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["CNC", "OEM", "ISO 9001"],
    products: [
      {
        id: "prod-cnc-gearbox",
        shortName: "CNC-machined gearbox housing",
        description: "High-tolerance aluminum gearbox housings for industrial machinery, EV assemblies, and export-grade OEM programs.",
        category: "Industrial Machinery",
        basePriceInr: 1530,
        moq: 250,
        stock: 18000,
        availableDays: 14,
        shippingWeight: "1.8 kg",
        pricingTiers: [
          { moq: 250, priceInr: 1530 },
          { moq: 1000, priceInr: 1405 },
          { moq: 5000, priceInr: 1225 }
        ]
      }
    ]
  },
  {
    id: "mfg-002",
    name: "Surya Home Textiles Export",
    country: "India",
    category: "Home Textiles",
    moq: "500 pieces",
    priceInr: 265,
    rating: 4.8,
    delivery: "9-14 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["Organic cotton", "Bulk", "Private label"],
    products: [
      {
        id: "prod-organic-bedsheet",
        shortName: "Organic cotton hotel bedsheet set",
        description: "Export-ready private-label cotton bedding with OEKO-TEX options, custom GSM, packaging, and bulk shipment support.",
        category: "Home Textiles",
        basePriceInr: 265,
        moq: 500,
        stock: 64000,
        availableDays: 11,
        shippingWeight: "0.6 kg",
        pricingTiers: [
          { moq: 500, priceInr: 265 },
          { moq: 2500, priceInr: 236 },
          { moq: 10000, priceInr: 206 }
        ]
      }
    ]
  },
  {
    id: "mfg-003",
    name: "NexGen EV Systems",
    country: "India",
    category: "Electronics",
    moq: "100 kits",
    priceInr: 3500,
    rating: 4.7,
    delivery: "18-25 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["EV", "Battery", "R&D"],
    products: [
      {
        id: "prod-ev-bms-kit",
        shortName: "EV battery management controller kit",
        description: "Configurable BMS controller kit for two-wheelers and light commercial EV platforms with testing documentation.",
        category: "Electronics",
        basePriceInr: 3500,
        moq: 100,
        stock: 4200,
        availableDays: 22,
        shippingWeight: "0.9 kg",
        pricingTiers: [
          { moq: 100, priceInr: 3500 },
          { moq: 500, priceInr: 3200 },
          { moq: 2000, priceInr: 2840 }
        ]
      }
    ]
  }
];

export const categories = [
  "Industrial Machinery",
  "Home Textiles",
  "Electronics",
  "Agriculture",
  "Pharma",
  "Packaging",
  "Auto Components"
];

export const products = manufacturers.flatMap((manufacturer) =>
  manufacturer.products.map((product) => ({ ...product, manufacturer }))
);

export type ProductWithManufacturer = (typeof products)[number];
