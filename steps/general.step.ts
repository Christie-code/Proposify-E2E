import { Given } from "@cucumber/cucumber";
import { ScenarioWorld } from "../support/scenario-world";
import { Page, expect } from "@playwright/test";
import { config } from "../support/config";
import { loginPage } from "../util/xpath_selectors";
import { authFile } from "../util/commons";

Given("I navigate to the dashboard", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL, { timeout: 0 });

  try {
    // Wait for the dashboard title to be visible or timeout after 10 seconds
    await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
      timeout: 3000,
    });
    console.log("Dashboard loaded successfully");
  } catch (error) {
    console.log("Dashboard not loaded, attempting to log in: ", error);
    await loginUser(page);
  }
});

export async function loginUser(page: Page) {
  await page.locator(loginPage.emailField).fill("olaoyechristy97@gmail.com");
  await page.locator(loginPage.passwordField).fill("Ememobong@95");
  await page.click(loginPage.loginButton);

  await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
    timeout: 3000,
  });
  // Save the login state
  await page.context().storageState({ path: authFile });
}
