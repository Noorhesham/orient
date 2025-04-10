import { WEBSITEURL } from "./constants";
import { Server } from "./main/Server";
export async function generateSitemaps() {
  const sitemapsForProducts = {
    id: `products`,
    url: `${WEBSITEURL}/sitemap/products.xml`,
  };

  const sitemapsForBlogs = {
    id: `blogs`,
    url: `${WEBSITEURL}/sitemap/blog.xml`,
  };
  const shop = {
    id: `shop`,
    url: `${WEBSITEURL}/sitemap/shop.xml`,
  };
  const staticSitemaps = {
    id: `static`,
    url: `${WEBSITEURL}/sitemap/static.xml`,
  };

  return [sitemapsForProducts, sitemapsForBlogs, staticSitemaps, shop];
}

// /dev : sitemap.xml/0 , production : sitemap/0.xml
export default async function sitemap({ id }: { id: string }) {
  const data = await Server({ resourceName: "sitemap" });
  console.log(id);
  if (id.includes("products")) {
    return data.products.map((item) => ({
      url: `${WEBSITEURL}/product/${item.id}`,
      lastModified: item.updated_at || item.created_at,
      changefreq: "monthly",

      priority: 0.8,
      alternates: {
        languages: {
          en: `${WEBSITEURL}/en/product/${item.id}`,
          ar: `${WEBSITEURL}/ar/product/${item.id}`,
        },
      },
    }));
  }

  if (id.includes("blogs")) {
    return data.blogs.map((item) => ({
      url: `${WEBSITEURL}/blog/${item.id}`,
      lastModified: item.updated_at || item.created_at,
      changefreq: "weekly",
      priority: 0.7,

      alternates: {
        languages: {
          en: `${WEBSITEURL}/en/blog/${item.id}`,
          ar: `${WEBSITEURL}/ar/blog/${item.id}`,
        },
      },
    }));
  }
  if (id.includes("shop")) {
    return data.productCategories.map((item) => ({
      url: `${WEBSITEURL}/shop?category_id=${item.id}`,
      lastModified: item.updated_at || item.created_at,
      changefreq: "monthly",
      alternates: {
        languages: {
          en: `${WEBSITEURL}/en/shop?category_id=${item.id}`,
          ar: `${WEBSITEURL}/ar/shop?category_id=${item.id}`,
        },
      },
    }));
  }

  if (id.includes("static")) {
    return [
      { url: `${WEBSITEURL}`, alternates: { languages: { en: `${WEBSITEURL}`, ar: `${WEBSITEURL}/ar` } } },
      {
        url: `${WEBSITEURL}/wishlist`,
        alternates: { languages: { en: `${WEBSITEURL}/en/wishlist`, ar: `${WEBSITEURL}/ar/wishlist` } },
      },
      {
        url: `${WEBSITEURL}/about-us`,
        alternates: { languages: { en: `${WEBSITEURL}/en/about-us`, ar: `${WEBSITEURL}/ar/about-us` } },
      },
      {
        url: `${WEBSITEURL}/contact-us`,
        alternates: { languages: { en: `${WEBSITEURL}/en/contact-us`, ar: `${WEBSITEURL}/ar/contact-us` } },
      },
      {
        url: `${WEBSITEURL}/shipping-address`,
        alternates: { languages: { en: `${WEBSITEURL}/shipping-address`, ar: `${WEBSITEURL}/ar/shipping-address` } },
      },
      {
        url: `${WEBSITEURL}/become-parteners`,
        alternates: { languages: { en: `${WEBSITEURL}/en/become-parteners`, ar: `${WEBSITEURL}/ar/become-parteners` } },
      },
      {
        url: `${WEBSITEURL}/branches`,
        alternates: { languages: { en: `${WEBSITEURL}/en/branches`, ar: `${WEBSITEURL}/ar/branches` } },
      },
      {
        url: `${WEBSITEURL}/get-inspired`,
        alternates: { languages: { en: `${WEBSITEURL}/en/get-inspired`, ar: `${WEBSITEURL}/ar/get-inspired` } },
      },
      {
        url: `${WEBSITEURL}/cart`,
        alternates: { languages: { en: `${WEBSITEURL}/en/cart`, ar: `${WEBSITEURL}/ar/cart` } },
      },
      {
        url: `${WEBSITEURL}/color-trend`,
        alternates: { languages: { en: `${WEBSITEURL}/en/color-trend`, ar: `${WEBSITEURL}/ar/color-trend` } },
      },
    ];
  }

  return [];
}
