import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertToHTML(input: string) {
  let html = input;

  // Convert <strong> and <em> tags
  html = html.replace(/<strong>([^<]+)<\/strong>/g, "<strong>$1</strong>");
  html = html.replace(/<em>([^<]+)<\/em>/g, "<em>$1</em>");

  // Convert <p> tags
  html = html.replace(/<p>([^<]+)<\/p>/g, "<p>$1</p>");

  // Convert <ol> and <li> tags
  //@ts-ignore
  html = html.replace(/<ol>(.*?)<\/ol>/gs, "<ol>$1</ol>");
  html = html.replace(/<li>([^<]+)<\/li>/g, "<li>$1</li>");

  // Convert <h2> tags with class attributes
  html = html.replace(/<h2 class="([^"]+)" levels="2">([^<]+)<\/h2>/g, '<h2 class="$1">$2</h2>');

  // Convert <div> tags with class attributes
  html = html.replace(/<div class="([^"]+)">([^<]+)<\/div>/g, '<div class="$1">$2</div>');

  return html;
}

export const processYoutubeUrl = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const matches = url.match(regex);
  const videoId = matches ? matches[1] : null;

  if (videoId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return { videoId, thumbnailUrl, embedUrl };
  }

  return { videoId: null, thumbnailUrl: "", embedUrl: "" };
};
export const formatPriceWithCommas = (price: number) => {
  // Ensure the price is a string and split integer and decimal parts
  const [integerPart, decimalPart] = price?.toString().split(".")||0;
  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Rejoin the decimal part if present
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
