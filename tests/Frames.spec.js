const {test, expect} = require('@playwright/test');
test.describe('Frames', () => {
    test('Frame validation', async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        const frame = page.frameLocator("#courses-iframe");
        await frame.locator("li a[href*='lifetime-access']:visible").click();
        const text = await frame.locator(".text h2").textContent();
        console.log(text); 
        console.log(text.split(" ")[0]); 
        console.log(text.split(" ")[1]); 

        // await page.waitForLoadState("networkidle");
        // const texts = await frame.locator(".pricing-title").allTextContents();
        // console.log(texts); // Output: ['Platinum', 'Bronze']

    });
});