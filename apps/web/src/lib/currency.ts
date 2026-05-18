export type CurrencyProfile = {
  code: string;
  country: string;
  name: string;
  symbol: string;
  locale: string;
};

export const currencyProfiles: CurrencyProfile[] = [
  { code: "INR", country: "India", name: "Indian Rupee", symbol: "₹", locale: "en-IN" },
  { code: "USD", country: "United States", name: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", country: "Eurozone", name: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", country: "United Kingdom", name: "Pound Sterling", symbol: "£", locale: "en-GB" },
  { code: "AED", country: "United Arab Emirates", name: "UAE Dirham", symbol: "د.إ", locale: "en-AE" },
  { code: "SAR", country: "Saudi Arabia", name: "Saudi Riyal", symbol: "﷼", locale: "en-SA" },
  { code: "SGD", country: "Singapore", name: "Singapore Dollar", symbol: "S$", locale: "en-SG" },
  { code: "AUD", country: "Australia", name: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "CAD", country: "Canada", name: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "JPY", country: "Japan", name: "Japanese Yen", symbol: "¥", locale: "ja-JP" }
];

export const defaultCurrencyProfile = currencyProfiles[0];

export const fallbackInrRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  SAR: 0.045,
  SGD: 0.016,
  AUD: 0.018,
  CAD: 0.016,
  JPY: 1.85
};

export function getCurrencyProfile(code?: string | null) {
  return currencyProfiles.find((currency) => currency.code === code) ?? defaultCurrencyProfile;
}

export function convertFromInr(amountInr: number, currencyCode: string, rates: Record<string, number>) {
  return amountInr * (rates[currencyCode] ?? fallbackInrRates[currencyCode] ?? 1);
}

export function formatMoneyFromInr(amountInr: number, currencyCode: string, rates: Record<string, number>) {
  const currency = getCurrencyProfile(currencyCode);
  const amount = convertFromInr(amountInr, currency.code, rates);

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: currency.code === "JPY" ? 0 : 2
  }).format(amount);
}
