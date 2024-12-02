import type { MetadataRoute } from "next";
import { Server } from "./main/Server";
import { WEBSITEURL } from "./constants";

export default async function sitemap(): MetadataRoute.Sitemap {
  const data = await Server({ resourceName: "sitemap" });
  console.log(data);

  return data.products.map((product: Product) => {
    return {
      url: `${WEBSITEURL}/product/${product.parent_id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      images: [product?.main_cover?.sizes?.medium],
      alternates: {
        languages: {
          en: `${WEBSITEURL}/en/product/${product.parent_id}`,
          ar: `${WEBSITEURL}/ar/product/${product.parent_id}`,
        },
      },
    };
  });
}
