import { test, expect } from "@playwright/test";
import {
  betaEditorPage,
  dashboardPage,
  documentsPage,
} from "../xpath_selectors";
import { loginUser } from "../commons";
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

    // I drag the signature block to the right edge of the document
    // Ensure the signature block is visible and get its bounding box
    const signatureBlock = page.locator(documentsPage.rightPaneSignatureBlock);
    const blockBox = await signatureBlock.boundingBox();
    // Ensure the container where you're going to drop the signature is visible
    const dropContainer = page.locator(documentsPage.filesDragAndDropContainer);
    await expect(dropContainer).toBeVisible();
    const dropContainerBox = await dropContainer.boundingBox();
    if (dropContainerBox) {
      const dropX =
        dropContainerBox.x +
        dropContainerBox.width -
        dropContainerBox.width / 4; // Right edge
      const dropY = dropContainerBox.y + dropContainerBox.height / 2 + 50; // Vertically centered
      // Scroll to bottom
      await page.mouse.wheel(dropX, dropY);
      await page.waitForTimeout(500);
      // Perform the drag and drop action
      await signatureBlock.hover();
      await page.mouse.down();
      await page.mouse.move(dropX, dropY);
      await page.mouse.up();
      // Verify signature block exists in the editor
      expect(
        await page
          .locator(documentsPage.editorPage)
          .locator(documentsPage.signatureBlock)
      );
    }
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
