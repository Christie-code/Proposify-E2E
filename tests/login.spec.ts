import { test, expect } from '@playwright/test';
import { loginPage } from '../xpath_selectors';

test.beforeEach(async ({ page }) => {
  await page.goto('https://gmail-270222.proposify.com');
});

test.describe('Verify Login', () => {

  test('Verify that I can log in to the Proposify Dashboard with valid credentials', async ({ page }) => {
    await page.locator(loginPage.emailField).fill("olaoyechristy97@gmail.com");
    await page.locator(loginPage.passwordField).fill("Ememobong@95");
    await page.click(loginPage.loginButton);
  
    await expect(page.locator(loginPage.dashboardPage)).toBeVisible({
      timeout: 7000,
    });
    // Save the login state
    // await page.context().storageState({ path: authFile });
  });
})
