const { test, expect } = require("@playwright/test");

test.describe("Login Tests", () => {

    test.only("Login", async ({ page }) => {
        const productNames = ("IPHONE 13 PRO");
        const email = ("anshika@gmail.com");
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Iamking@000");
        await page.locator("#login").click();
        await page.waitForLoadState("networkidle"); 
        const allTextContents = await page.locator (".card-body b").allTextContents();
        console.log (allTextContents);
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            const productName = await products.nth(i).locator("b").textContent();
            if (productName === productNames) {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text= Checkout ").click();
        await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 100});
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const country = await dropdown.locator("button").nth(i).textContent();
            if (country === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        expect(page.locator(".user__name [type = 'text']").first()).toHaveText(email);
        await page.locator(".action__submit ").click();
        expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log("Order ID: ", orderID);


    })
});