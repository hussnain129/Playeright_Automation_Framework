const { test, expect, request } = require("@playwright/test");
const loginPayload = { userEmail: "m.hussnain1994@gmail.com", userPassword: "Hasnain129*" }
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = await loginResponse.json();
    token = loginResponseBody.token;
    console.log("Token: ", token);
    console.log("Login Response Body: ", loginResponseBody);
});

test.describe("Login Tests", () => {

    test("Login", async ({ page }) => {
        
        page.addInitScript(value => {
            window.localStorage.setItem("token", value);
        }
        , token);
        await page.goto("https://rahulshettyacademy.com/client/");
        // await page.locator("#userEmail").fill(email);
        // await page.locator("#userPassword").fill("Iamking@000");
        // await page.locator("#login").click();
        const productNames = ("IPHONE 13 PRO");
        const email = ("m.hussnain1994@gmail.com");
        const products = page.locator(".card-body");
        await page.waitForLoadState("networkidle");
        const allTextContents = await page.locator(".card-body b").allTextContents();
        console.log(allTextContents);
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
        await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(email);
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

        await page.pause();

    });
});