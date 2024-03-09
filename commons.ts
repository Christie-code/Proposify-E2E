// import { config } from "../support/config";
import { Page, expect } from "@playwright/test";
import { loginPage } from "./xpath_selectors";

export const authFile = "./.auth/user.json";
export const noAuthFile = "./.auth/noauth.json";

export function getBaseUrl(page: Page) {
  const currentUrl = page.url();
  const urlObject = new URL(currentUrl);
  return `${urlObject.protocol}//${urlObject.host}`;
}

export async function loginUser(page: Page) {
  await page.locator(loginPage.emailField).fill("olaoyechristy97@gmail.com");
  await page.locator(loginPage.passwordField).fill("Ememobong@95");
  await page.click(loginPage.loginButton);

  await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
    timeout: 7000,
  });
  // Save the login state
  // await page.context().storageState({ path: authFile });
}