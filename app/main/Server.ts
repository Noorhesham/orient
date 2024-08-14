"use server";
import { cookies } from "next/headers";
const BASE_URL = "https://lab.r-m.dev/api";
const VERSION = "v1";
//function to get the full url from the resource name
const getURL = (resourceName: string, id?: string) => {
  switch (resourceName) {
    // in each case i write the original cases (from the server)
    case "user":
      return `${BASE_URL}/rm_users`;
    case "login":
      return `${BASE_URL}/rm_users/${VERSION}/create_authentication`;
    case "signup":
      return `${BASE_URL}/rm_users/${VERSION}/registration`;
    case "posts":
      return `${BASE_URL}/posts`;
    case "MGS":
      return `${BASE_URL}/rm_users/${VERSION}/start_app`;
    case "reset":
      return `${BASE_URL}/rm_users/${VERSION}/forget_password`;
    case "verify":
      return `${BASE_URL}/rm_users/${VERSION}/account_verification/${id}/send`;
    case "validate":
      return `${BASE_URL}/rm_users/${VERSION}/account_verification/${id}/validate`;
    case "token":
      return `${BASE_URL}/rm_users/${VERSION}/authentication`;
    case "logout":
      return `${BASE_URL}/rm_users/${VERSION}/log_out`;
    case "tfaSend":
      return `${BASE_URL}/rm_users/${VERSION}/tfa/${id}/send`;
    case "tfaActivate":
      return `${BASE_URL}/rm_users/${VERSION}/tfa/activate`;
    case "tfaValidate":
      return `${BASE_URL}/rm_users/${VERSION}/tfa/${id}/validate`;
    case "update_profile":
      return `${BASE_URL}/rm_users/${VERSION}/update_profile`;
    case "update_password":
      return `${BASE_URL}/rm_users/${VERSION}/update_password`;
    case "remove_account":
      return `${BASE_URL}/rm_users/${VERSION}/remove_account`;
    default:
      return BASE_URL;
  }
};
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
  | "remove_account"|"tfaActivate"; //types the user allowed to add its resource
export async function Server({
  resourceName,
  id,
  method,
  body,
  headers,
  noHeaders = false,
  cache = false,
}: {
  resourceName: ResourceNameProps;
  method: MethodProps;
  body?: any;
  headers?: any;
  id?: string;
  noHeaders?: boolean;
  cache?: boolean;
}) {
  try {
    // const cacheKey = `${resourceName}:${method}`;
    // const cachedData = getCache(cacheKey);
    // if (cachedData) return cachedData;
    //get the token from cookies to send along with every request to the server
    const jwt = cookies().get("jwt")?.value;
    const deviceId = cookies().get("deviceInfo")?.value;
    const combinedHeaders = {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${jwt}`,
      ...headers,
    };
    jwt && jwt !== "undefined" && !noHeaders ? (combinedHeaders.Authorization = `Bearer ${jwt}`) : null;
    deviceId ? (combinedHeaders["device-unique-id"] = `${JSON.parse(deviceId).device_unique_id}`) : null;
    const response = await fetch(getURL(resourceName, id), {
      method,
      headers: combinedHeaders,
      body: body && JSON.stringify(body),
      cache: cache ? "force-cache" : "no-cache",
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    console.log(data, body, combinedHeaders);
    return data;
  } catch (error) {
    console.log("Server request error:", error);
    throw new Error(`Error: ${error} `);
  }
}
