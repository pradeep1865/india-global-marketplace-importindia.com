import { NextResponse } from "next/server";
import { currencyProfiles, fallbackInrRates } from "@/lib/currency";

export const dynamic = "force-dynamic";

type CurrencyLayerResponse = {
  success: boolean;
  source?: string;
  timestamp?: number;
  quotes?: Record<string, number>;
  error?: { code?: number; info?: string };
};

const currencyCodes = currencyProfiles.map((currency) => currency.code);

function buildInrRatesFromUsdQuotes(quotes: Record<string, number>) {
  const usdToInr = quotes.USDINR;
  if (!usdToInr) throw new Error("Currencylayer response did not include USDINR");

  return Object.fromEntries(
    currencyCodes.map((code) => {
      if (code === "INR") return [code, 1];
      const usdToTarget = code === "USD" ? 1 : quotes[`USD${code}`];
      return [code, usdToTarget ? usdToTarget / usdToInr : fallbackInrRates[code]];
    })
  ) as Record<string, number>;
}

export async function GET() {
  const accessKey = process.env.CURRENCYLAYER_API_KEY;

  if (!accessKey) {
    return NextResponse.json({
      base: "INR",
      rates: fallbackInrRates,
      source: "fallback",
      updatedAt: new Date().toISOString()
    });
  }

  const url = new URL("https://api.currencylayer.com/live");
  url.searchParams.set("access_key", accessKey);
  url.searchParams.set("currencies", currencyCodes.join(","));

  try {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 30 }
    });
    if (!response.ok) throw new Error("Currencylayer request failed");

    const data = (await response.json()) as CurrencyLayerResponse;
    if (!data.success || !data.quotes) throw new Error(data.error?.info ?? "Currencylayer returned an error");

    return NextResponse.json({
      base: "INR",
      rates: buildInrRatesFromUsdQuotes(data.quotes),
      source: "currencylayer",
      providerBase: data.source ?? "USD",
      updatedAt: data.timestamp ? new Date(data.timestamp * 1000).toISOString() : new Date().toISOString()
    });
  } catch {
    return NextResponse.json({
      base: "INR",
      rates: fallbackInrRates,
      source: "fallback",
      updatedAt: new Date().toISOString()
    });
  }
}
