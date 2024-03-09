// import { config } from "../support/config";
import { Page } from "@playwright/test";

export const authFile = "./.auth/user.json";
export const noAuthFile = "./.auth/noauth.json";

export function getBaseUrl(page: Page) {
  const currentUrl = page.url();
  const urlObject = new URL(currentUrl);
  return `${urlObject.protocol}//${urlObject.host}`;
}