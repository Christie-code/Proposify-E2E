import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../support/scenario-world";
import { config } from "../support/config";
import { expect } from "@playwright/test";
import { loginPage } from "../util/xpath_selectors";
import { authFile } from "../util/commons";

Given("I am on the Login Page", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL, { timeout: 0 });
});

Given("I enter my email address as {string}", async function (email: string) {
  const page = this.page!;
  await page.locator(loginPage.emailField).fill(email);
});

When("I enter my password as {string}", async function (password: string) {
  const page = this.page!;
  await page.locator(loginPage.passwordField).fill(password);
});

When("I click on the Login button", async function () {
  const page = this.page!;
  await page.click(loginPage.loginButton);
});

Then("I am directed to the Proposify Dashboard Page", async function () {
  const page = this.page!;

  await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
    timeout: 3000,
  });
  // Save the login state
  await page.context().storageState({ path: authFile });
});
