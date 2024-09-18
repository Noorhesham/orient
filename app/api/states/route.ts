// /app/api/states/route.ts
import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country_code = searchParams.get("country_code") || "EG";
  const STATES_API_URL = `${BASE_URL}/api/states/entities-operations?country_code=${country_code}&itemsCount=200`;
  const res = await fetch(STATES_API_URL, {
    cache: "force-cache",
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch states" }, { status: res.status });
  }

  const data = await res.json();

  const response = NextResponse.json(data);

  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return response;
}
