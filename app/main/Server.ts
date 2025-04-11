"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Constants
const BASE_URL = "https://backend.orient-paints.com/api";
const VERSION = "v1";
const WebsiteUrl = "https://orient-nine.vercel.app";
// Types for Method and Resource Names
export type MethodProps = "GET" | "POST" | "PUT" | "DELETE";
export type ResourceNameProps =
  | "user"
  | "posts"
  | "login"
  | "signup"
  | "MGS"
  | "reset"
  | "verify"
  | "validate"
  | "token"
  | "logout"
  | "tfaSend"
  | "tfaValidate"
  | "update_password"
  | "update_profile"
  | "remove_account"
  | "tfaActivate"
  | "getDevices"
  | "deviceLogout"
  | "languageUpdate"
  | "getEntity"
  | "getSingleEntity"
  | "getSearch"
  | "addToCart"
  | "getActiveCart"
  | "getProduct"
  | "addToCartQuantity"
  | "about-us"
  | "addComment"
  | "getForms"
  | "submitForm"
  | "getReviews"
  | "createShipping"
  | "updateEntity"
  | "checkout"
  | "applyCoupon"
  | "updateCart"
  | "deleteCoupon"
  | "getProducts"
  | "completeOrder"
  | "my_orders"
  | "google"
  | "my_order"
  | "deleteEntity"
  | "countries"
  | "cities"
  | "states"
  | "home"
  | "getWishlist"
  | "addWishlist"
  | "colortrend"
  | "branches"
  | "check"
  | "wishlist"
  | "calculate"
  | "getinspired"
  | "sitemap"
  | "create-verification"
  | "verify-account"
  | "page"
  | "calculate-send";

// Function to get the full URL from the resource name
const getURL = (resourceName: ResourceNameProps, id?: string, entityName?: string, queryParams?: URLSearchParams) => {
  const url = BASE_URL;
  switch (resourceName) {
    case "user":
      return { url: `${url}/rm_users`, method: "GET" as MethodProps };
    case "login":
      return { url: `${url}/rm_users/${VERSION}/create_authentication`, method: "POST" };
    case "signup":
      return { url: `${url}/rm_users/${VERSION}/registration`, method: "POST" };
    case "posts":
      return { url: `${url}/posts`, method: "GET" };
    case "MGS":
      return { url: `${url}/rm_users/${VERSION}/start_app`, method: "POST" };
    case "reset":
      return { url: `${url}/rm_users/${VERSION}/forget_password`, method: "POST" };
    case "verify":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/send`, method: "POST" };
    case "validate":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/validate`, method: "POST" };
    case "token":
      return { url: `${url}/rm_users/${VERSION}/authentication`, method: "POST" };
    case "logout":
      return { url: `${url}/rm_users/${VERSION}/log_out`, method: "POST" };
    case "tfaSend":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/send`, method: "POST" };
    case "tfaActivate":
      return { url: `${url}/rm_users/${VERSION}/tfa/activate`, method: "POST" };
    case "tfaValidate":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/validate`, method: "POST" };
    case "update_profile":
      return { url: `${url}/rm_users/${VERSION}/update_profile`, method: "POST" };
    case "update_password":
      return { url: `${url}/rm_users/${VERSION}/update_password`, method: "POST" };
    case "remove_account":
      return { url: `${url}/rm_users/${VERSION}/remove_account`, method: "POST" };
    case "getDevices":
      return { url: `${url}/rm_users/${VERSION}/devices/get`, method: "GET" };
    case "deviceLogout":
      return { url: `${url}/rm_users/${VERSION}/devices/stop`, method: "POST" };
    case "languageUpdate":
      return { url: `${url}/rm_users/${VERSION}/device_sys`, method: "POST" };
    case "getEntity":
      return { url: `${url}/${entityName}/entities-operations?${queryParams}`, method: "GET" };
    case "countries":
      return { url: `${url}/countries/entities-operations?itemsCount=200&${queryParams}`, method: "GET" };
    case "cities":
      return { url: `${url}/info-cities/entities-operations?state_id=${id}`, method: "GET" };
    case "states":
      return {
        url: `${url}/states/entities-operations?itemsCount=200&country_id=${id}`,
        method: "GET",
      };
    case "createShipping":
      return { url: `${url}/${entityName}/entities-operations/store`, method: "POST" };
    case "updateEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}/update`, method: "PUT" };
    case "deleteEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}/delete?trash=1`, method: "DELETE" };
    case "getSearch":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/search?${queryParams}`, method: "GET" };
    case "getProducts":
      return { url: `${url}/rm_ecommarce/${VERSION}/products?${queryParams}`, method: "GET" };
    case "getSingleEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}?${queryParams}`, method: "GET" };
    case "getinspired":
      return { url: `${url}/${entityName}/entities-operations?${queryParams}`, method: "GET" };
    case "addToCart":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/add_to_cart`, method: "POST" };
    case "getActiveCart":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/get_active_cart?${queryParams}`, method: "GET" };
    case "getProduct":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/${id}?${queryParams}`, method: "POST" };
    case "addToCartQuantity":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/change_item_count`, method: "POST" };
    case "addComment":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/${id}/review`, method: "POST" };
    case "about-us":
      return { url: `${url}/rm_page/v1/show?with=metas&slug=about-us-web`, method: "GET" };
    case "page":
      return { url: `${url}/rm_page/v1/show?with=metas&slug=${id}`, method: "GET" };
    case "getForms":
      return { url: `${url}/forms/getForms`, method: "POST" };
    case "submitForm":
      return { url: `${url}/forms/${id}/submit`, method: "POST" };
    case "getReviews":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/${id}/reviews`, method: "GET" };
    case "checkout":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/prepare_checkout`, method: "GET" };
    case "applyCoupon":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/apply_coupon`, method: "POST" };
    case "deleteCoupon":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/delete_coupon`, method: "POST" };
    case "updateCart":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/update_cart`, method: "POST" };
    case "completeOrder":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/complete_order`, method: "POST" };
    case "my_orders":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/my_orders`, method: "GET" };
    case "my_order":
      return { url: `${url}/rm_ecommarce/${VERSION}/cart/my_orders/${id}`, method: "GET" };
    case "home":
      return { url: `${url}/rm_page/${VERSION}/show?slug=${id || "home-web"}`, method: "GET" };
    case "getWishlist":
      return { url: `${url}/ec-products/entities-operations/bookmarks/list`, method: "GET" };
    case "addWishlist":
      return { url: `${url}/ec-products/entities-operations/${id}/bookmarks`, method: "POST" };
    case "colortrend":
      return { url: `${url}/rm_page/${VERSION}/show?with=blogs&slug=color-trend` };
    case "branches":
      return { url: `${url}/ec-stores/entities-operations?with=state_id,country_id,city_id&itemsCount=200` };
    case "check":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/check?${queryParams}`, method: "GET" };
    case "wishlist":
      return { url: `${url}/ec-products/entities-operations/bookmarks/list` };
    case "calculate":
      return { url: `${url}/rm_ecommarce/${VERSION}/product-calculator` };
    case "calculate-send":
      return { url: `${url}/rm_ecommarce/${VERSION}/product-calculator`, method: "POST" };
    case "google":
      return { url: `${url}/rm_seo/google-sheet` };
    case "sitemap":
      return { url: `${url}/rm_seo/sitemap` };
    case "create-verification":
      return { url: `${url}/rm_users/${VERSION}/account_verification/create`, method: "POST" };
    case "verify-account":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/validate-account-code`, method: "POST" };
    default:
      return { url, method: "GET" as MethodProps };
  }
};

// Server Request Function
export async function Server({
  resourceName,
  id,
  method,
  body,
  headers,
  noHeaders = false,
  cache = 0,
  img = false,
  entityName,
  queryParams,
  formData,
}: {
  resourceName: ResourceNameProps;
  id?: string;
  method?: MethodProps;
  body?: any;
  headers?: any;
  noHeaders?: boolean;
  cache?: number;
  img?: boolean;
  entityName?: string;
  queryParams?: URLSearchParams;
  formData?: boolean;
}) {
  const jwt = cookies().get("jwt")?.value;
  const deviceId = cookies().get("deviceInfo")?.value || "{}";
  const lang = cookies().get("NEXT_LOCALE")?.value || "en";
  // Set up headers
  const combinedHeaders: { [key: string]: string } = {
    ...headers,
  };
  if (resourceName === "page" && id?.includes("map")) {
    throw new Error("Invalid static file request");
  }

  if (jwt && jwt !== "undefined" && !noHeaders) {
    combinedHeaders.Authorization = `Bearer ${jwt}`;
  }
  if (deviceId) {
    combinedHeaders["device-unique-id"] = JSON.parse(deviceId).device_unique_id;
  }
  if (lang) {
    combinedHeaders["lang"] = lang;
  }
  try {
    if (!jwt || jwt === "undefined") {
      console.warn("JWT cookie is missing or invalid");
    }
    if (!deviceId || deviceId === "{}") {
      console.warn("Device ID cookie is missing or default value");
    }
    if (!lang) {
      console.warn("Language cookie is missing, defaulting to 'en'");
    }

    const { url, method: resolvedMethod } = getURL(resourceName, id, entityName, queryParams);
    let requestBody;
    if (formData) requestBody = body;
    else {
      requestBody = body ? JSON.stringify(body) : undefined;
      combinedHeaders["Content-Type"] = "application/json";
    }
    const response = await fetch(url, {
      method: method || resolvedMethod,
      headers: combinedHeaders,
      body: requestBody,
      next: {
        revalidate: cache ? cache : 0,
        tags: cache ? [`${resourceName}`] : [],
      },
    });

    console.log(url, "fetched url", lang);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    if (data.message === "Device token mismatch" || data.message === "Login again please") {
      redirect("/login?error=true");
    }
    return data;
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error.message === "Device token mismatch" || error.message === "Login again please") {
      redirect("/login?error=true");
    }
    if (error.message.includes("401")) {
      redirect("/login?error=true");
    }
    console.error("Server request error:", error);
    throw new Error(`Error: ${error.message}`);
  }
}

const logout = () => {
  cookies().delete("jwt");
};
