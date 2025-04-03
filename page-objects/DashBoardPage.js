class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }

   async searchProduct(productNames) {
        const allTextContents = await this.productText.allTextContents();
        console.log(allTextContents);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const productName = await this.products.nth(i).locator("b").textContent();
            if (productName === productNames) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
    }

}
module.exports = { DashBoardPage };