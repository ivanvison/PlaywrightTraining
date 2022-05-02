//Use learned so far to automate registration and login to http://rahulshettyacademy.com/client

//Needed test annotation
const {test, expect} = require('@playwright/test');

test('Register @ Client Page', async ({browser})=> {
    
    //Create context, one instance - fresh instance like incognito
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.locator('p:has-text("Register Here")').click();
    await page.locator("#firstName").type("Ivan");
    await page.locator("#lastName").type("Vison");
    await page.locator("#userEmail").type("ivanvison@outlook.com");
    await page.locator("#userMobile").type("809-580-1111");
    await page.selectOption('[class*="custom-select"]', '2: Student');
    await page.locator("[value='Male']").click();
    await page.locator("#userPassword").type("Unicorn9");
    await page.locator("#confirmPassword").type("Unicorn9");
    await page.locator("[type='checkbox']").click();
    await page.locator("[type='submit']").click();
})

/* Login Test*/
test.only('Page Test', async ({browser})=> {
    //Create context, one instance - fresh instance like incognito
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.locator("#userEmail").type("ivanvison@outlook.com");
    await page.locator("#userPassword").type("Unicorn9");
    await page.locator("[type='submit']").click();

    //Data through the network call / api
    //Wait for all calls are made
    //This one is good for service based app
    await page.waitForLoadState('networkidle');
    const title = await page.locator(".card-body h5").allTextContents();
    console.log(title);
})
