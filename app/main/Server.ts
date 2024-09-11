"use server";
import { cookies } from "next/headers";

// Constants
const BASE_URL = "https://lab.r-m.dev/api";
const VERSION = "v1";

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
  | "submitForm";

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
      return { url: `${url}/${entityName}/entities-operations`, method: "GET" };
    case "getSearch":
      return { url: `${url}/rm_ecommarce/${VERSION}/products/search?${queryParams}`, method: "GET" };
    case "getSingleEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}`, method: "GET" };
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
    case "getForms":
      return { url: `${url}/forms/getForms`, method: "POST" };
    case "submitForm":
      return { url: `${url}/forms/${id}/submit`, method: "POST" };
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
  // Get the token and device info from cookies
  const jwt = cookies().get("jwt")?.value;
  const deviceId = cookies().get("deviceInfo")?.value;

  // Set up headers
  const combinedHeaders: { [key: string]: string } = {
    "Content-Type": img ? "multipart/form-data" : "application/json",
    ...headers,
  };

  if (jwt && jwt !== "undefined" && !noHeaders) {
    combinedHeaders.Authorization = `Bearer ${jwt}`;
  }
  if (deviceId) {
    combinedHeaders["device-unique-id"] = JSON.parse(deviceId).device_unique_id;
  }
  try {
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
      next: { revalidate: cache ? cache : 0 },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(body);
    return data;
  } catch (error: any) {
    console.error("Server request error:", error);
    throw new Error(`Error: ${error.message}`);
  }
}
