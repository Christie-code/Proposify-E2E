import { test, expect } from "@playwright/test";
import {
  betaEditorPage,
  dashboardPage,
  documentsPage,
} from "../xpath_selectors";
import { getBaseUrl, loginUser } from "../commons";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await loginUser(page);
});

test.describe("Document Creation", () => {
  test("Upload Images to Document Library", async ({ page }) => {
    // I am on the New Beta Editor page
    await page.click(dashboardPage.newBetaEditorLink);

    // I click on New Document
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());

    // I click on the content tab
    await page.click(documentsPage.contentNodeTab);

    // I click on the Image Block
    await page.click(documentsPage.imageBlockBtn);

    // I upload multiple images
    expect(await page.locator(documentsPage.addImageBlockBtn)).toBeVisible();
    const filePaths = ["assets/testImage1.png", "assets/testImage2.jpg"];
    await page
      .locator(documentsPage.uploadImageBlockInput)
      .setInputFiles(filePaths);
    await page.waitForTimeout(5000);
    expect(
      await page.locator(documentsPage.uploadImageLibraryChild).count()
    ).toBeGreaterThan(1);
  });

  test("Add a signature block to a new document", async ({ page }) => {
    // I am on the New Beta Editor page
    await page.click(dashboardPage.newBetaEditorLink);

    // I click on New Document
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());

    // I click on the Signatures tab
    await expect(page.locator(documentsPage.signatureNodeTab)).toBeVisible();
    await page.click(documentsPage.signatureNodeTab);

    // I should see a signature block
    await expect(
      page.locator(documentsPage.rightPaneSignatureBlock)
    ).toBeVisible();
  });
});

test.describe("Document Management", () => {
  test("Verify Documents Draft Filter and Trash", async ({ page }) => {
    // I am on the New Beta Editor page
    await page.click(dashboardPage.newBetaEditorLink);

    // I click on New Document
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());

    // I return to the Beta Editor page
    await page.goBack();
    await expect(page.locator(betaEditorPage.newDocumentBtn)).toBeVisible();

    // I should see a filter bar
    await expect(page.locator(betaEditorPage.filterBar)).toBeVisible();

    // I click on the Draft filter
    await page.click(betaEditorPage.draftFilterBtn);

    // The document created should be shown with the status Draft
    await expect(
      page.locator(betaEditorPage.draftDocumentTag).first()
    ).toContainText("Draft");

    // I navigate to the trash
    await page.click(betaEditorPage.trashedDocumentsBtn);

    // I empty the trash
    await page.click(betaEditorPage.emptyTrashNowAction);
  });
});
