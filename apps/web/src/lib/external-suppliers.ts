export type ExternalSupplierProductPreview = {
  titleEnglish: string;
  segment: string;
  minMoq: number;
  priceRange: string;
  leadTimeDays: number;
};

export type ExternalSupplierPreview = {
  id: string;
  sourcePlatform: string;
  companyNameEnglish: string;
  companyNameOriginal: string;
  province: string;
  country: string;
  mainProducts: string[];
  electronicsSegments: string[];
  capabilities: string[];
  minMoq: number;
  priceRange: string;
  leadTimeDays: number;
  rating: number;
  badges: string[];
  products: ExternalSupplierProductPreview[];
};

export const externalSupplierFields = [
  "source platform",
  "source supplier id",
  "store/profile URL",
  "company original name",
  "English company name",
  "legal name",
  "business license",
  "registered address",
  "city/province/country",
  "contact person",
  "phone/email/website",
  "years active",
  "employee count",
  "factory size",
  "annual revenue",
  "main products",
  "electronics segments",
  "OEM/ODM/sample support",
  "MOQ",
  "price range",
  "lead time",
  "trade/payment terms",
  "shipping ports",
  "ratings/reviews",
  "badges",
  "certifications",
  "raw source snapshot"
];

export const externalSupplierSamples: ExternalSupplierPreview[] = [
  {
    id: "external-1688-electronics-1",
    sourcePlatform: "1688 permitted export",
    companyNameEnglish: "Shenzhen CircuitLink Electronics",
    companyNameOriginal: "深圳市电路联电子有限公司",
    province: "Guangdong",
    country: "China",
    mainProducts: ["USB-C adapters", "Bluetooth receiver boards", "charging modules"],
    electronicsSegments: ["Cables & Commonly Used Accessories", "Speakers & Accessories", "Chargers, Batteries & Power Supplies"],
    capabilities: ["OEM", "ODM", "private label", "sample available"],
    minMoq: 100,
    priceRange: "CNY 8 - 42",
    leadTimeDays: 12,
    rating: 4.7,
    badges: ["Factory profile", "Electronics supplier", "Needs admin verification"],
    products: [
      { titleEnglish: "USB-C PD charging adapter board", segment: "Chargers, Batteries & Power Supplies", minMoq: 100, priceRange: "CNY 12 - 28", leadTimeDays: 10 },
      { titleEnglish: "Bluetooth audio receiver module", segment: "Speakers & Accessories", minMoq: 200, priceRange: "CNY 8 - 19", leadTimeDays: 12 }
    ]
  },
  {
    id: "external-1688-electronics-2",
    sourcePlatform: "1688 permitted export",
    companyNameEnglish: "Dongguan SmartVision Components",
    companyNameOriginal: "东莞市智视电子配件厂",
    province: "Guangdong",
    country: "China",
    mainProducts: ["camera flash lights", "photography kits", "portable LED controllers"],
    electronicsSegments: ["Camera, Photo & Accessories", "Smart Electronics"],
    capabilities: ["OEM", "bulk packaging", "custom labels"],
    minMoq: 50,
    priceRange: "CNY 18 - 96",
    leadTimeDays: 15,
    rating: 4.5,
    badges: ["Supplier research", "Document review needed"],
    products: [
      { titleEnglish: "Rechargeable camera flash light", segment: "Camera, Photo & Accessories", minMoq: 50, priceRange: "CNY 46 - 96", leadTimeDays: 15 },
      { titleEnglish: "Photography light kit", segment: "Camera, Photo & Accessories", minMoq: 80, priceRange: "CNY 58 - 128", leadTimeDays: 18 }
    ]
  }
];
