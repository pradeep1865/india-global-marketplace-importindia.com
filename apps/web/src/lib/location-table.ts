export type CityRow = {
  id: string;
  name: string;
};

export type StateRow = {
  id: string;
  name: string;
  cities: CityRow[];
};

export type CountryRow = {
  code: string;
  name: string;
  dialCode: string;
  states: StateRow[];
};

const commonCities = (prefix: string): CityRow[] => [
  { id: `${prefix}-capital`, name: "Capital / Central City" },
  { id: `${prefix}-commercial`, name: "Commercial District" },
  { id: `${prefix}-port`, name: "Port / Logistics Hub" }
];

export const locationTable: CountryRow[] = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    states: [
      { id: "mh", name: "Maharashtra", cities: [{ id: "mumbai", name: "Mumbai" }, { id: "pune", name: "Pune" }, { id: "nagpur", name: "Nagpur" }] },
      { id: "dl", name: "Delhi", cities: [{ id: "new-delhi", name: "New Delhi" }, { id: "delhi", name: "Delhi" }] },
      { id: "ka", name: "Karnataka", cities: [{ id: "bengaluru", name: "Bengaluru" }, { id: "mysuru", name: "Mysuru" }, { id: "mangaluru", name: "Mangaluru" }] },
      { id: "tn", name: "Tamil Nadu", cities: [{ id: "chennai", name: "Chennai" }, { id: "coimbatore", name: "Coimbatore" }, { id: "madurai", name: "Madurai" }] },
      { id: "gj", name: "Gujarat", cities: [{ id: "ahmedabad", name: "Ahmedabad" }, { id: "surat", name: "Surat" }, { id: "mundra", name: "Mundra" }] },
      { id: "hr", name: "Haryana", cities: [{ id: "faridabad", name: "Faridabad" }, { id: "gurugram", name: "Gurugram" }, { id: "panipat", name: "Panipat" }] },
      { id: "wb", name: "West Bengal", cities: [{ id: "kolkata", name: "Kolkata" }, { id: "howrah", name: "Howrah" }, { id: "durgapur", name: "Durgapur" }] }
    ]
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    states: [
      { id: "ca", name: "California", cities: [{ id: "los-angeles", name: "Los Angeles" }, { id: "san-francisco", name: "San Francisco" }, { id: "long-beach", name: "Long Beach" }] },
      { id: "ny", name: "New York", cities: [{ id: "new-york", name: "New York City" }, { id: "buffalo", name: "Buffalo" }, { id: "rochester", name: "Rochester" }] },
      { id: "tx", name: "Texas", cities: [{ id: "houston", name: "Houston" }, { id: "dallas", name: "Dallas" }, { id: "austin", name: "Austin" }] }
    ]
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    states: [
      { id: "dubai", name: "Dubai", cities: [{ id: "dubai-city", name: "Dubai" }, { id: "jebel-ali", name: "Jebel Ali" }] },
      { id: "abu-dhabi", name: "Abu Dhabi", cities: [{ id: "abu-dhabi-city", name: "Abu Dhabi" }, { id: "al-ain", name: "Al Ain" }] },
      { id: "sharjah", name: "Sharjah", cities: [{ id: "sharjah-city", name: "Sharjah" }] }
    ]
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    states: [
      { id: "england", name: "England", cities: [{ id: "london", name: "London" }, { id: "manchester", name: "Manchester" }, { id: "birmingham", name: "Birmingham" }] },
      { id: "scotland", name: "Scotland", cities: [{ id: "glasgow", name: "Glasgow" }, { id: "edinburgh", name: "Edinburgh" }] }
    ]
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    states: [{ id: "singapore", name: "Singapore", cities: [{ id: "singapore-city", name: "Singapore" }, { id: "jurong", name: "Jurong" }] }]
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    states: [
      { id: "hamburg", name: "Hamburg", cities: [{ id: "hamburg-city", name: "Hamburg" }] },
      { id: "bavaria", name: "Bavaria", cities: [{ id: "munich", name: "Munich" }, { id: "nuremberg", name: "Nuremberg" }] },
      { id: "nrw", name: "North Rhine-Westphalia", cities: [{ id: "cologne", name: "Cologne" }, { id: "dusseldorf", name: "Dusseldorf" }] }
    ]
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    states: [
      { id: "ile-de-france", name: "Ile-de-France", cities: [{ id: "paris", name: "Paris" }] },
      { id: "provence", name: "Provence-Alpes-Cote d'Azur", cities: [{ id: "marseille", name: "Marseille" }, { id: "nice", name: "Nice" }] }
    ]
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    states: [
      { id: "nsw", name: "New South Wales", cities: [{ id: "sydney", name: "Sydney" }, { id: "newcastle", name: "Newcastle" }] },
      { id: "vic", name: "Victoria", cities: [{ id: "melbourne", name: "Melbourne" }] }
    ]
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    states: [
      { id: "ontario", name: "Ontario", cities: [{ id: "toronto", name: "Toronto" }, { id: "ottawa", name: "Ottawa" }] },
      { id: "bc", name: "British Columbia", cities: [{ id: "vancouver", name: "Vancouver" }] }
    ]
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    states: [
      { id: "riyadh", name: "Riyadh", cities: [{ id: "riyadh-city", name: "Riyadh" }] },
      { id: "makkah", name: "Makkah", cities: [{ id: "jeddah", name: "Jeddah" }, { id: "makkah-city", name: "Makkah" }] }
    ]
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    states: [
      { id: "tokyo", name: "Tokyo", cities: [{ id: "tokyo-city", name: "Tokyo" }, { id: "yokohama", name: "Yokohama" }] },
      { id: "osaka", name: "Osaka", cities: [{ id: "osaka-city", name: "Osaka" }, { id: "kobe", name: "Kobe" }] }
    ]
  },
  ...[
    ["BD", "Bangladesh", "+880"],
    ["LK", "Sri Lanka", "+94"],
    ["NP", "Nepal", "+977"],
    ["TH", "Thailand", "+66"],
    ["MY", "Malaysia", "+60"],
    ["ID", "Indonesia", "+62"],
    ["VN", "Vietnam", "+84"],
    ["PH", "Philippines", "+63"],
    ["CN", "China", "+86"],
    ["KR", "South Korea", "+82"],
    ["NL", "Netherlands", "+31"],
    ["IT", "Italy", "+39"],
    ["ES", "Spain", "+34"],
    ["BR", "Brazil", "+55"],
    ["MX", "Mexico", "+52"],
    ["ZA", "South Africa", "+27"],
    ["NG", "Nigeria", "+234"],
    ["KE", "Kenya", "+254"],
    ["EG", "Egypt", "+20"],
    ["TR", "Turkey", "+90"]
  ].map(([code, name, dialCode]) => ({
    code,
    name,
    dialCode,
    states: [{ id: `${code.toLowerCase()}-default`, name: "State / Province", cities: commonCities(code.toLowerCase()) }]
  }))
];

export function findCountryByCode(code?: string) {
  return locationTable.find((country) => country.code === code);
}
