// File: pages/api/sitemap.js

import { NextResponse } from "next/server";
import { WEBSITEURL } from "../../constants";
import { Server } from "../../main/Server";

export async function GET() {
  // Fetch data from your server-side function
  const data = await Server({ resourceName: "google" });

  // Start XML structure
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Loop through products and create URL entries
  data.products.forEach((product) => {
    const imageUrl = product.main_cover?.[0]?.sizes?.medium;
    sitemap += `
    <url>
      <loc>${WEBSITEURL}/product/${product.parent_id}</loc>   
      <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${WEBSITEURL}/en/product/${product.parent_id || ""}"/>
      <xhtml:link
        rel="alternate"
        hreflang="ar"
        href="${WEBSITEURL}/ar/product/${product.parent_id || ""}"/>
      ${
        imageUrl
          ? `
      <image:image>
        <image:loc>${imageUrl}</image:loc>
        <image:title>${product.title}</image:title>
        <image:caption>${product.description}</image:caption>
      </image:image>`
          : ""
      }
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`;
  });

  // Close the URL set
  sitemap += `</urlset>`;

  // Set XML content type
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": Buffer.byteLength(sitemap).toString(),
    },
  });
}
