const { test, expect, request } = require("@playwright/test");
const APIUtils = require("./utils/APIUtils.js");
const loginPayload = { userEmail: "m.hussnain1994@gmail.com", userPassword: "Hasnain129*" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8df56c0d3e6622a297ccd" }] }
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test.describe("Login Tests", () => {

    test("Login", async ({ page }) => {

        page.addInitScript(value => {
            window.localStorage.setItem("token", value);
        }
            , response.token);
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); ++i) {
            const orderIDText = await rows.nth(i).locator("th").textContent();

            if (orderIDText && response.orderID.includes(orderIDText.trim())) {
                const viewButton = rows.nth(i).locator("button:has-text('View')");
                await viewButton.waitFor({ state: "visible" }); // Ensure button is visible
                await viewButton.click();
                break;
            }
        }

        await page.locator(".col-text").waitFor();
        const orderIdDetails = await page.locator(".col-text").textContent();

        expect(response.orderID.includes(orderIdDetails.trim())).toBeTruthy();

        await page.pause();

    });
});