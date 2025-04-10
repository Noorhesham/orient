// /app/api/cities/route.ts
import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state_id = searchParams.get("state_id") || "3202";
  const CITIES_API_URL = `${BASE_URL}/api/info-cities/entities-operations?state_id=${state_id}`;
  const res = await fetch(CITIES_API_URL, {
    cache: "force-cache",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: res.status });
  }

  const data = await res.json();

  const response = NextResponse.json(data);

  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return response;
}
