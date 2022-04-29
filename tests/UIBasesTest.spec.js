//Needed test annotation
const {test, expect} = require('@playwright/test');

test('Browser Context Test', async ({browser})=> {
    //Create context, one instance - fresh instance like incognito
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
})

/* Adding .only runs only this test */
test('Page Test', async ({page})=> {
    await page.goto("https://www.google.com");
    //Get title then assertion

    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})
