class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }

    async searchProductAddCart(productName) {
        await this.page.waitForLoadState('networkidle');
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);

        for(let i = 0; i < count; ++i ) {
            console.log(await this.products.nth(i).locator("b").textContent());
            if(await this.products.nth(i).locator("b").textContent() === productName) {
                //acc to cart
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

}

module.exports = {DashboardPage}