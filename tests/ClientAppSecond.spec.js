const { test, expect } = require("@playwright/test");

// Test data that could be moved to a separate config file
const TEST_DATA = {
  productName: "IPHONE 13 PRO",
  credentials: {
    email: "anshika@gmail.com",
    password: "Iamking@000"
  },
  country: {
    searchTerm: "ind",
    selection: "India"
  }
};

test.describe("Login and Order Flow Tests", () => {
  test("Complete login, order placement, and order verification", async ({ page }) => {
    // 1. Login
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(TEST_DATA.credentials.email);
    await page.getByPlaceholder("enter your passsword").fill(TEST_DATA.credentials.password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");

    // 2. Add product to cart
    const productCard = page.locator(".card-body").filter({ hasText: TEST_DATA.productName });
    await productCard.getByRole("button", { name: "Add To Cart" }).click();
    
    // 3. Go to cart and verify product
    await page.getByRole ("listitem").getByRole("button", { name: "Cart" }).click();
    await expect(page.getByText(TEST_DATA.productName)).toBeVisible();
    
    // 4. Proceed to checkout
    await page.getByRole("button", { name: "Checkout" }).click();
    
    // 5. Select country and place order
    await page.getByPlaceholder("Select Country").pressSequentially(TEST_DATA.country.searchTerm);
    await page.getByRole("button", { name: TEST_DATA.country.selection }).nth(1).click();
    await page.getByText("Place Order").click();
    
    // 6. Verify order confirmation
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
    // 7. Get order ID
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID: ", orderID);
    
    // 8. Navigate to orders page
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    
    // 9. Find and verify the order in orders list
    const rows = page.locator("tbody tr");
    const orderFound = await findOrderInTable(rows, orderID);
    
    expect(orderFound).toBeTruthy();
    
    // 10. Verify order details
    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails.trim())).toBeTruthy();
  });

  // Helper function to find order in table
  async function findOrderInTable(rows, orderID) {
    for (let i = 0; i < await rows.count(); ++i) {
      const orderIDText = await rows.nth(i).locator("th").textContent();
      
      if (orderIDText && orderID.includes(orderIDText.trim())) {
        const viewButton = rows.nth(i).locator("button:has-text('View')");
        await viewButton.click();
        return true;
      }
    }
    return false;
  }
});