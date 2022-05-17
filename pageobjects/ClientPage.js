const {test, expect} = require('@playwright/test');

class ClientPage {

    constructor(page) {
        this.page = page;
        this.clientPageTitle = page.locator("h1:has-text('Clients')");
        this.newClientButton = page.locator("text= New");
    }

    async validateClientPageTitle() {
        await this.page.waitForLoadState('networkidle');
        const bool = await this.clientPageTitle.isVisible();
        expect(bool).toBeTruthy();
    }

    async navigateToNewClientPage() {
        await this.newClientButton.click();
    }
}

module.exports = {ClientPage};