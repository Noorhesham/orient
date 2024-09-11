interface ImageSize {
  thumbnail: string;
  medium: string;
  large: string;
  "1200_800": string;
  "800_1200": string;
  "1200_300": string;
  "300_1200": string;
  [key: string]: string; // To handle additional dynamic keys like "Image--4-_webp", etc.
}

interface ProductImage {
  id: number;
  type: string;
  title: string;
  alt: string;
  file: string;
  thumbnail: string;
  sizes: ImageSize;
}

interface Product {
  id: number;
  sku: string;
  stock_status: "in" | "out" | "low";
  title: string;
  description: string | null;
  short_description: string | null;
  main_cover: ProductImage[]; // Array of images
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
  status: "publish" | "draft" | "pending";
  type: "variation" | "simple" | "grouped";
  search_queries: string | null;
  purchase_note: string | null;
  videos: string | null; // Assuming videos are represented by a URL string
  images: ProductImage[];
  three_d_model: string[]; // Array of 3D model URLs
  image_360_panorama: string[]; // Array of 360 panorama URLs
  quantity: number;
  limit_order_purchases: number | null;
  limit_order_purchases_time: string | null;
  limit_order_purchases_time_count: number | null;
  review_rate: number | null;
  review_count: number | null;
  comments_count: number | null;
  regular_price: number;
  sell_price: number | null;
  price: number;
  parent_id: number | null;
  brand_id: number | null;
  shipping_class_id: number | null;
  category_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
interface Category {
  id: number;
  title: string;
  status: "publish" | "draft" | "pending"; // Assuming these are possible statuses
  parent_id: number | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

interface Brand {
  id: string; // Assuming the ID is an ISO date string, adjust if different
  title: string;
  logo: string[]; // Assuming an array of logo URLs
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

interface AttributeOption {
  id: number;
  value: string;
  label: string;
}

interface Attribute {
  id: number;
  slug: string;
  title: string;
  options: AttributeOption[]; // Array of options for the attribute
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

interface Tag {
  id: number;
  title: string;
  lang: string;
  created_by: number;
  updated_by: number | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null; // ISO date string or null
}
