import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GeoProviderResponse = {
  city?: string;
  country_name?: string;
  country_code?: string;
  ip?: string;
  error?: boolean;
};

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const candidate = forwardedFor || realIp;

  if (!candidate || ["::1", "127.0.0.1", "localhost"].includes(candidate)) return "";
  if (candidate.startsWith("10.") || candidate.startsWith("192.168.") || candidate.startsWith("172.16.")) return "";
  return candidate;
}

export async function GET(request: NextRequest) {
  const ip = getRequestIp(request);
  const endpoint = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";

  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 60 * 6 }
    });

    if (!response.ok) throw new Error("Geolocation provider failed");

    const data = (await response.json()) as GeoProviderResponse;
    if (data.error) throw new Error("Geolocation provider returned an error");

    return NextResponse.json({
      city: data.city || "",
      country: data.country_name || "India",
      countryCode: data.country_code || "IN",
      source: "ipapi",
      ipDetected: Boolean(data.ip)
    });
  } catch {
    return NextResponse.json({
      city: "New Delhi",
      country: "India",
      countryCode: "IN",
      source: "fallback",
      ipDetected: false
    });
  }
}
