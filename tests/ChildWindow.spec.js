const { test, expect } = require("@playwright/test");
test("Child Windows Handle", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),  // Wait for new page first
        documentLink.click(),          // Then trigger the click (no await here)
    ]);

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")[1];
    const domain = arrayText.split(" ")[0];
    await page.locator("#username").fill(domain);
    await page.pause();  
});