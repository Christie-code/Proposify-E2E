import { test, expect } from "@playwright/test";
import {
  betaEditorPage,
  dashboardPage,
  documentsPage,
  loginPage,
} from "../xpath_selectors";
import { faker } from "@faker-js/faker";
import { loginUser } from "../commons";

test.beforeEach(async ({ page }) => {
  await loginUser(page)
});

test.describe("Upload Images to Document Library", () => {
  test("I am on the New Beta Editor page", async ({ page }) => {
    await page.click(dashboardPage.newBetaEditorLink);
  });

  test("I click on New Document", async ({ page }) => {
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());
  });

  test("I click on the content tab", async ({ page }) => {
    await page.click(documentsPage.contentNodeTab);
    });

  test("I click on the Image Block", async ({ page }) => {
    await page.click(documentsPage.imageBlockBtn);
  });

  test("I upload multiple images  ", async ({ page,}) => {
    expect(await page.locator(documentsPage.addImageBlockBtn)).toBeVisible();
    const filePaths = ["assets/testImage1.png", "assets/testImage2.jpg"];
    await page
      .locator(documentsPage.uploadImageBlockInput)
      .setInputFiles(filePaths);
    await page.waitForTimeout(1000);
    expect(
      await page.locator(documentsPage.uploadImageLibraryChild).count()
    ).toBeGreaterThan(1);
  });

});

test.describe("Add a signature block to a new document", () => {
  test("I am on the New Beta Editor page", async ({ page }) => {
    await page.click(dashboardPage.newBetaEditorLink);
  });

  test("I click on New Document", async ({ page }) => {
    await page.click(betaEditorPage.newDocumentBtn);
    await page.fill(documentsPage.documentTitle, faker.word.noun());
  });

  test("I click on the Signatures tab", async ({ page }) => {
    await expect(page.locator(documentsPage.signatureNodeTab)).toBeVisible();
  await page.click(documentsPage.signatureNodeTab);
  });

  test("I should see a signature block", async ({ page }) => {
    await expect(
      page.locator(documentsPage.rightPaneSignatureBlock)
    ).toBeVisible();
  });

  test("I drag the signature block to the right edge of the document", async ({ page,}) => {
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
