const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { DashBoardPage } = require("../page-objects/DashBoardPage");

test.describe("Login Tests", () => {

    test("Login", async ({ page }) => {
        const productNames = ("IPHONE 13 PRO");
        const password = ("Iamking@000");
        const userName= ("anshika@gmail.com");
        const products = page.locator(".card-body");
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login(userName, password);
        const dashboardpage = new DashBoardPage(page);
        await dashboardpage.searchProduct(productNames);
        await dashboardpage.navigateToCart();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text= Checkout ").click();
        await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
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
        await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(userName);
        await page.locator(".action__submit ").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log("Order ID: ", orderID);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); ++i) {
            const orderIDText = await rows.nth(i).locator("th").textContent();

            if (orderIDText && orderID.includes(orderIDText.trim())) {
                const viewButton = rows.nth(i).locator("button:has-text('View')");
                await viewButton.waitFor({ state: "visible" }); // Ensure button is visible
                await viewButton.click();
                break;
            }
        }

        // Wait for order details to appear
        await page.locator(".col-text").waitFor();
        const orderIdDetails = await page.locator(".col-text").textContent();

        // Verify the order details contain the order ID
        expect(orderID.includes(orderIdDetails.trim())).toBeTruthy();


    });
});