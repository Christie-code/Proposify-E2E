import { Page, expect } from "@playwright/test";
import { loginPage } from "./xpath_selectors";

export function getBaseUrl(page: Page) {
  const currentUrl = page.url();
  const urlObject = new URL(currentUrl);
  return `${urlObject.protocol}//${urlObject.host}`;
}

export async function loginUser(page: Page) {
  await page.goto('/', {timeout:0});
  await page.locator(loginPage.emailField).fill("olaoyechristy97@gmail.com");
  await page.locator(loginPage.passwordField).fill("Ememobong@95");
  await page.click(loginPage.loginButton);

  await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
    timeout: 3000,
  });
}