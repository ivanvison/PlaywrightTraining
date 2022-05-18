const {test, expect} = require('@playwright/test');

class ValidateClient {
    
    constructor(page) {
        this.page = page;
        this.clientsTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.clientTable = page.locator("table").waitFor();
        this.clientList = page.locator('xpath=//td[3]');
    }

    async clientNameValidation(randomName) {
        await this.page.waitForLoadState('networkidle');
        console.log("-- Iteration --");
        for(let i=0; i < await this.rows.count(); i++) {
            const rowClientName = await this.rows.nth(i).locator("td:nth-child(3)").textContent();
            console.log("Result #"+i+": "+rowClientName);
            if(rowClientName.includes(randomName)) {
                console.log("--> Company is in the list");
                break;
            }
        }
    }

    async printClientResults() {
        console.log("Results in the page: ", await this.clientList.count());
    }
}

module.exports = {ValidateClient};