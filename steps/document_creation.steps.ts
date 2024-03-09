import { Given, When, Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../support/scenario-world";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  dashboardPage,
  betaEditorPage,
  documentsPage,
} from "../util/xpath_selectors"; // Assumed import for editor selectors

Given("I am on the New Beta Editor page", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(dashboardPage.newBetaEditorLink);
});

When("I click on New Document", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(betaEditorPage.newDocumentBtn);
  await page.fill(documentsPage.documentTitle, faker.word.noun());
});

When("I click on the content tab", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(documentsPage.contentNodeTab);
});

When("I click on the Image Block", async function (this: ScenarioWorld) {
  const page = this.page!;
  await page.click(documentsPage.imageBlockBtn);
});

Then(
  "I upload {string} as images",
  async function (this: ScenarioWorld, imagePaths: string) {
    const page = this.page!;

    expect(await page.locator(documentsPage.addImageBlockBtn)).toBeVisible();
    const filePaths = imagePaths
      .split(",")
      .map((imagePath) => imagePath.trim());
    await page
      .locator(documentsPage.uploadImageBlockInput)
      .setInputFiles(filePaths);
    await page.waitForTimeout(1000);
    expect(
      await page.locator(documentsPage.uploadImageLibraryChild).count()
    ).toBeGreaterThan(1);
  }
);

Then("I click on the Signatures tab", async function (this: ScenarioWorld) {
  const page = this.page!;
  await expect(page.locator(documentsPage.signatureNodeTab)).toBeVisible();
  await page.click(documentsPage.signatureNodeTab);
});

Then("I should see a signature block", async function (this: ScenarioWorld) {
  const page = this.page!;
  await expect(
    page.locator(documentsPage.rightPaneSignatureBlock)
  ).toBeVisible();
});

Then(
  "I drag the signature block to the right edge of the document",
  async function (this: ScenarioWorld) {
    const page = this.page!;

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
  }
);
