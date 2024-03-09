import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../support/scenario-world";
import { expect } from "@playwright/test";
import {
  betaEditorPage,
} from "../util/xpath_selectors"; // Assumed import for editor selectors
import { config } from "../support/config";
import { getBaseUrl } from "../util/commons";

Given("I return to the Beta Editor page", async function (this: ScenarioWorld) {
  const page = this.page!;
  const baseUrl = getBaseUrl(page);
  await page.goto(`${baseUrl}/pipeline`);
  await expect(page.locator(betaEditorPage.newDocumentBtn)).toBeVisible();
});

Then("I should see a filter bar", async function (this: ScenarioWorld) {
  const page = this.page!;
  await expect(page.locator(betaEditorPage.filterBar)).toBeVisible();
});

When("I click on the Draft filter", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(betaEditorPage.draftFilterBtn);
});

Then(
  "The document created should be shown with the status Draft",
  async function (this: ScenarioWorld) {
    const page = this.page!;
    await expect(page.locator(betaEditorPage.draftDocumentTag).first()).toContainText("Draft");
  }
);

When("I navigate to the trash", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(betaEditorPage.trashedDocumentsBtn);
});

Then("I empty the trash", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(betaEditorPage.emptyTrashNowAction);
});