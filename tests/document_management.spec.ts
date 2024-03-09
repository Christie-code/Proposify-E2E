import { test, expect } from "@playwright/test";
import {
  betaEditorPage,
  dashboardPage,
  documentsPage,
  loginPage,
} from "../xpath_selectors";
import { getBaseUrl } from "../commons";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  test("I navigate to dashboard", async ({ page }) => {
    await page.goto("https://gmail-270222.proposify.com");
    await page.locator(loginPage.emailField).fill("olaoyechristy97@gmail.com");
    await page.locator(loginPage.passwordField).fill("Ememobong@95");
    await page.click(loginPage.loginButton);

    await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
      timeout: 7000,
    });
  });

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
});

test.describe("Verify Documents Draft Filter and Trash", () => {
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
