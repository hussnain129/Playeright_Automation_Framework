const { test, expect } = require("@playwright/test");

test.describe("Login Tests", () => {
  
  test.beforeEach(async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  });

  async function login(page, username, password) {
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("[type=submit]").click();
  }

  test("Login with incorrect credentials should show error", async ({ page }) => {
    await login(page, "rahulshettyacademy", "wrongpassword");

    const errorMessage = page.locator("[style*=block]");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Incorrect");
  });

  test("Login with correct credentials should redirect to dashboard", async ({ page }) => {
    await login(page, "rahulshettyacademy", "learning");

    await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop");
    const cardTitles = page.locator(".card-body a");

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.allTextContents());
  });

  test("UI Operations", async ({ page }) => {
    const dropDown = page.locator("select.form-control");
    const checkBox = page.locator(".radiotextsty").last();
    const terms = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await login(page, "rahulshettyacademy", "learning");
    await dropDown.selectOption("consult");
    
    await checkBox.click();
    await page.locator("#okayBtn").click();
    await expect(checkBox).toBeChecked();

    await terms.click();
    await expect(terms).toBeChecked();

    await terms.uncheck();
    expect(await terms.isChecked()).toBe(false);
    await expect(documentLink).toHaveAttribute("class","blinkingText");
  });

  
});
