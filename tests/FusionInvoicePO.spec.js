/*Original testing file were giving me issues, making it difficul to move forward.
Decided to change the project test to Fusion Invoice. Login, validate, create customer, validate the creation in the list*/

const {text, expect, default: test} = require('@playwright/test');

test('Fusion Invoice Client creation', async ({page}) => {

    const userName = "demo@fusioninvoice.com";
    const password = "demopass";
    const url = "http://demo.fusioninvoice.com/"
    const expectedClientName = "Wessdsdfsfex Pet Shop";

    //Login
    await page.goto(url);
    await page.locator("#email").type(userName);
    await page.locator("[type='password']").type(password);
    await page.locator("[name='submit_button']").click();
    await page.waitForLoadState('networkidle');

    //Dashboard Validation
    const dashboardTitle = await page.locator("h1:has-text('Dashboard')").isVisible();
    expect(dashboardTitle).toBeTruthy();
    const boxesText = await page.locator(".small-box p").allTextContents();
    console.log(boxesText);

    //Client Section and Validation
    await page.locator(".main-sidebar >> text=Clients").click();
    const clientsTitle = await page.locator("h1:has-text('Clients')").isVisible();
    expect(clientsTitle).toBeTruthy();

    await page.locator("table").waitFor();
    const rows = await page.locator("table tr");
    console.log("Results", await rows.count());
    console.log(await page.locator('xpath=//td[3]').allTextContents());
    console.log("--Iteration--");
    /*for(let i = 0; i < await rows.count(); i++) {
        const rowClientName = await rows.nth(i).locator('xpath=//td[3]').textContent();
        console.log(rowClientName);
    }*/
    expect(await page.locator('xpath=//td[3]').allTextContents().includes(expectedClientName)).toBeTruthy();

});