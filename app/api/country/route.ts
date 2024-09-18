import { BASE_URL } from "@/app/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COUNTRIES_API_URL = `${BASE_URL}/countries/entities-operations?itemsCount=200`;

export async function GET() {
  console.log(cookies().get("deviceInfo")?.value);
  const res = await fetch(COUNTRIES_API_URL, {});

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: res.status });
  }
  const data = await res.json();

  const response = NextResponse.json(data);

  // Set Cache-Control headers for "forever" caching
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return response;
}
