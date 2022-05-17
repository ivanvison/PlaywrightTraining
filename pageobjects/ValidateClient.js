const {test, expect} = require('@playwright/test');

class ValidateClient {
    
    constructor(page) {
        this.page = page;
        this.clientTable = page.locator("table").waitFor();
        this.clientList = page.locator('xpath=//td[3]');
    }

    async printClientResults() {
        console.log("Results: ", await this.clientList.count());
        //console.log(await this.clientList.allTextContents());
    }

    async clientNameValidation(randomName) {
        console.log("--Iteration--");
        for(let i = 0; i < this.clientList.length; i++) {
            console.log(clientList[i]);
            if(this.clientList[i] === randomName) {
                console.log("--> Company is in the list");
                break;
            }
        }
    }
}

module.exports = {ValidateClient};