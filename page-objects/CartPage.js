class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("text=Checkout");
        this.productName = page.locator(".cartSection h3");
    }

    async getCartProductName() {
        const productName = await this.productName.textContent();
        return productName;
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}