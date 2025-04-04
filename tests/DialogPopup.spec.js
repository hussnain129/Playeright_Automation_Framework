const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();
    });
    await page.locator("#confirmbtn").click();
   
});

