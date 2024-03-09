import { test, expect } from "@playwright/test";
import {
  betaEditorPage,
  dashboardPage,
  documentsPage,
} from "../xpath_selectors";
import { getBaseUrl, loginUser } from "../commons";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  loginUser(page);
});

test.describe("Verify Documents Draft Filter and Trash", () => {
  test("I am on the New Beta Editor page", async ({ page }) => {
    await page.click(dashboardPage.newBetaEditorLink);
  });

  test("I click on New Document", async ({ page }) => {
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());
  });

  test("I return to the Beta Editor page", async ({ page }) => {
    const baseUrl = getBaseUrl(page);
    await page.goto(`${baseUrl}/pipeline`);
    await expect(page.locator(betaEditorPage.newDocumentBtn)).toBeVisible();
  });

  test("I should see a filter bar", async ({ page }) => {
    await expect(page.locator(betaEditorPage.filterBar)).toBeVisible();
  });

  test("I click on the Draft filter", async ({ page }) => {
    await page.click(betaEditorPage.draftFilterBtn);
  });

  test("The document created should be shown with the status Draft", async ({
    page,
  }) => {
    await expect(
      page.locator(betaEditorPage.draftDocumentTag).first()
    ).toContainText("Draft");
  });

  test("I navigate to the trash", async ({ page }) => {
    await page.click(betaEditorPage.trashedDocumentsBtn);
  });

  test("I empty the trash", async ({ page }) => {
    await page.click(betaEditorPage.emptyTrashNowAction);
  });
});
