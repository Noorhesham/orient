import type { MetadataRoute } from "next";
import { Server } from "./main/Server";
import { WEBSITEURL } from "./constants";

export default async function googleSheetsSitemap(): MetadataRoute.Sitemap {
  const data = await Server({ resourceName: "sitemap" });

  return data.products.map((product: Product) => {
    return {
      url: `${WEBSITEURL}/product/${product.parent_id}`,
      lastModified: new Date(),
      images: [product?.main_cover?.sizes?.medium],
    };
  });
}
