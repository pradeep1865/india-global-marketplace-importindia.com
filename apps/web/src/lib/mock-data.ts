export type ElectronicsSegment = {
  id: string;
  name: string;
  image: string;
  parent: string;
};

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
  segment: string;
  basePriceInr: number;
  moq: number;
  stock: number;
  availableDays: number;
  shippingWeight: string;
  image: string;
  tags: string[];
  connectivity: string[];
  useCase: string[];
  certification: string[];
  pricingTiers: Array<{ moq: number; priceInr: number }>;
};

export const electronicsCategoryGroups = [
  "VR, AR, MR Hardware & Software",
  "Other Consumer Electronics",
  "Earphone & Headphone Accessories",
  "Speakers & Accessories",
  "TV Receivers & Accessories",
  "Chargers, Batteries & Power Supplies",
  "Mobile Phone & Accessories",
  "Cables & Commonly Used Accessories",
  "Smart Electronics",
  "Used Electronics",
  "Television, Home Audio, Video & Accessories",
  "Camera, Photo & Accessories",
  "Portable Audio, Video & Accessories",
  "Video Games & Accessories",
  "Projectors & Presentation Equipments",
  "Computer Hardware & Software",
  "Mobile Phone & Computer Repair Parts"
];

export const electronicsSegments: ElectronicsSegment[] = [
  {
    id: "laptops",
    name: "Laptops",
    parent: "Computer Hardware & Software",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "home-theater-systems",
    name: "Home Theater Systems",
    parent: "Television, Home Audio, Video & Accessories",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "software",
    name: "Software",
    parent: "Computer Hardware & Software",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "computer-accessories",
    name: "Computer Accessories",
    parent: "Computer Hardware & Software",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "electronic-accessories",
    name: "Electronic Accessories",
    parent: "Other Consumer Electronics",
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "adapters",
    name: "Adapters",
    parent: "Chargers, Batteries & Power Supplies",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "mp4-players",
    name: "MP4 Players",
    parent: "Portable Audio, Video & Accessories",
    image: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "photography-equipment",
    name: "Photography Equipment",
    parent: "Camera, Photo & Accessories",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "bass-amplifier",
    name: "Bass Amplifier",
    parent: "Speakers & Accessories",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "bluetooth-receiver",
    name: "Bluetooth Receiver",
    parent: "Speakers & Accessories",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "camera-flash-lights",
    name: "Camera Flash Lights",
    parent: "Camera, Photo & Accessories",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "cord-organizer",
    name: "Cord Organizer",
    parent: "Cables & Commonly Used Accessories",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "laptop-parts",
    name: "Laptop Parts",
    parent: "Mobile Phone & Computer Repair Parts",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "micro-cable",
    name: "Micro Cable",
    parent: "Cables & Commonly Used Accessories",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "photography-kit",
    name: "Photography Kit",
    parent: "Camera, Photo & Accessories",
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "garden-speaker",
    name: "Garden Speaker",
    parent: "Smart Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "sim-card-adapters",
    name: "Sim Cards Adapters",
    parent: "Mobile Phone & Accessories",
    image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "vr-ar-mr-software",
    name: "VR, AR, MR Software",
    parent: "VR, AR, MR Hardware & Software",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "mr-hardware",
    name: "MR Hardware",
    parent: "VR, AR, MR Hardware & Software",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "ar-hardware",
    name: "AR Hardware",
    parent: "VR, AR, MR Hardware & Software",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "vr-ar-mr-accessories",
    name: "VR, AR, MR Accessories",
    parent: "VR, AR, MR Hardware & Software",
    image: "https://images.unsplash.com/photo-1586170321090-283f5f198c52?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "vr-hardware",
    name: "VR Hardware",
    parent: "VR, AR, MR Hardware & Software",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=500&q=80"
  }
];

export const manufacturers: Manufacturer[] = [
  {
    id: "mfg-ev-001",
    name: "NexGen EV Systems",
    country: "India",
    category: "Consumer Electronics",
    moq: "100 kits",
    priceInr: 3500,
    rating: 4.7,
    delivery: "18-25 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22731c9c13?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["EV", "Battery", "R&D", "CE-ready"],
    products: [
      {
        id: "prod-ev-bms-kit",
        shortName: "EV battery management controller kit",
        description: "Configurable BMS controller kit for two-wheelers and light commercial EV platforms with testing documentation.",
        category: "Consumer Electronics",
        segment: "Smart Electronics",
        basePriceInr: 3500,
        moq: 100,
        stock: 4200,
        availableDays: 22,
        shippingWeight: "0.9 kg",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        tags: ["EV", "Battery", "Controller", "Smart electronics"],
        connectivity: ["CAN", "Bluetooth"],
        useCase: ["Industrial", "OEM"],
        certification: ["CE-ready"],
        pricingTiers: [
          { moq: 100, priceInr: 3500 },
          { moq: 500, priceInr: 3200 },
          { moq: 2000, priceInr: 2840 }
        ]
      }
    ]
  },
  {
    id: "mfg-audio-002",
    name: "SonicWave Audio Exports",
    country: "India",
    category: "Consumer Electronics",
    moq: "250 units",
    priceInr: 1890,
    rating: 4.8,
    delivery: "12-18 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["Bluetooth", "Audio", "Private label", "RoHS"],
    products: [
      {
        id: "prod-bluetooth-receiver",
        shortName: "Low-latency Bluetooth audio receiver",
        description: "Compact receiver module for home theater, portable speakers, and OEM audio kits.",
        category: "Consumer Electronics",
        segment: "Bluetooth Receiver",
        basePriceInr: 1890,
        moq: 250,
        stock: 19000,
        availableDays: 14,
        shippingWeight: "0.25 kg",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
        tags: ["Bluetooth 5.3", "Audio", "Receiver"],
        connectivity: ["Bluetooth", "AUX", "USB-C"],
        useCase: ["Home", "OEM"],
        certification: ["RoHS", "CE-ready"],
        pricingTiers: [
          { moq: 250, priceInr: 1890 },
          { moq: 1000, priceInr: 1720 },
          { moq: 5000, priceInr: 1490 }
        ]
      }
    ]
  },
  {
    id: "mfg-camera-003",
    name: "PhotonPro Imaging",
    country: "India",
    category: "Consumer Electronics",
    moq: "150 kits",
    priceInr: 4200,
    rating: 4.9,
    delivery: "10-16 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["Camera", "Studio", "Lighting", "Export"],
    products: [
      {
        id: "prod-photography-kit",
        shortName: "Portable photography creator kit",
        description: "Tripod, compact LED panels, flash triggers, and softbox lighting for creators and studios.",
        category: "Consumer Electronics",
        segment: "Photography Kit",
        basePriceInr: 4200,
        moq: 150,
        stock: 7600,
        availableDays: 12,
        shippingWeight: "2.4 kg",
        image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=80",
        tags: ["Photography", "Lighting", "Creator kit"],
        connectivity: ["USB-C", "Wireless trigger"],
        useCase: ["Creator", "Studio"],
        certification: ["CE-ready"],
        pricingTiers: [
          { moq: 150, priceInr: 4200 },
          { moq: 750, priceInr: 3890 },
          { moq: 2500, priceInr: 3480 }
        ]
      }
    ]
  },
  {
    id: "mfg-compute-004",
    name: "CoreLink Computer Parts",
    country: "India",
    category: "Consumer Electronics",
    moq: "500 pieces",
    priceInr: 740,
    rating: 4.6,
    delivery: "8-13 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["Laptop parts", "Accessories", "Repair", "Bulk"],
    products: [
      {
        id: "prod-laptop-parts",
        shortName: "Laptop keyboard and repair parts bundle",
        description: "Bulk laptop replacement keyboard, hinge, bracket, and connector bundles for repair networks.",
        category: "Consumer Electronics",
        segment: "Laptop Parts",
        basePriceInr: 740,
        moq: 500,
        stock: 54000,
        availableDays: 9,
        shippingWeight: "0.4 kg",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
        tags: ["Laptop", "Repair parts", "Keyboard"],
        connectivity: ["Ribbon cable"],
        useCase: ["Repair", "Wholesale"],
        certification: ["RoHS"],
        pricingTiers: [
          { moq: 500, priceInr: 740 },
          { moq: 2500, priceInr: 675 },
          { moq: 10000, priceInr: 610 }
        ]
      }
    ]
  },
  {
    id: "mfg-vr-005",
    name: "Immersia XR Hardware",
    country: "India",
    category: "Consumer Electronics",
    moq: "80 units",
    priceInr: 6800,
    rating: 4.8,
    delivery: "16-24 days",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["VR", "AR", "MR", "SDK"],
    products: [
      {
        id: "prod-vr-hardware",
        shortName: "VR headset accessory hardware kit",
        description: "Comfort straps, controller grips, charging dock, and SDK-ready accessory bundle for VR platforms.",
        category: "Consumer Electronics",
        segment: "VR Hardware",
        basePriceInr: 6800,
        moq: 80,
        stock: 2800,
        availableDays: 20,
        shippingWeight: "1.2 kg",
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=900&q=80",
        tags: ["VR", "Accessory", "Gaming"],
        connectivity: ["USB-C", "Bluetooth"],
        useCase: ["Gaming", "Training"],
        certification: ["CE-ready"],
        pricingTiers: [
          { moq: 80, priceInr: 6800 },
          { moq: 400, priceInr: 6250 },
          { moq: 1600, priceInr: 5890 }
        ]
      }
    ]
  },
  {
    id: "mfg-power-006",
    name: "VoltEdge Power Accessories",
    country: "India",
    category: "Consumer Electronics",
    moq: "1000 pieces",
    priceInr: 220,
    rating: 4.5,
    delivery: "7-12 days",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80"
    ],
    tags: ["Adapters", "Cables", "Chargers", "BIS-ready"],
    products: [
      {
        id: "prod-micro-cable",
        shortName: "Braided micro cable and adapter set",
        description: "Bulk cable and adapter pack for mobile phone, IoT, and accessory distribution channels.",
        category: "Consumer Electronics",
        segment: "Micro Cable",
        basePriceInr: 220,
        moq: 1000,
        stock: 140000,
        availableDays: 8,
        shippingWeight: "0.08 kg",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
        tags: ["Cable", "Adapter", "Mobile accessory"],
        connectivity: ["USB", "Micro USB", "USB-C"],
        useCase: ["Retail", "Wholesale"],
        certification: ["BIS-ready", "RoHS"],
        pricingTiers: [
          { moq: 1000, priceInr: 220 },
          { moq: 5000, priceInr: 185 },
          { moq: 20000, priceInr: 158 }
        ]
      }
    ]
  }
];

export const categories = electronicsCategoryGroups;

export const products = manufacturers.flatMap((manufacturer) =>
  manufacturer.products.map((product) => ({ ...product, manufacturer }))
);

export type ProductWithManufacturer = (typeof products)[number];
