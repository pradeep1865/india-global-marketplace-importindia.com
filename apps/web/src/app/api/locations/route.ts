import { NextResponse } from "next/server";
import { locationTable } from "@/lib/location-table";

export function GET() {
  return NextResponse.json({ countries: locationTable });
}
