//Needed test annotation
const {test, expect} = require('@playwright/test');

test('@Web Handling Web Dialogs, Frames & Events Listeners', async ({page}) => {
   
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());

    //Go to a site and come back
    //await page.goto("https://google.com");
    //await page.goBack();

    //Element in invisible mode or not
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Handle Dialog
    await page.on('dialog', dialog => dialog.accept());
    //await page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();
    
    //HOVER elements
    await page.locator("#mousehover").hover();

    //Handling Frames - iframes / frameset
    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click()
    
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

    //await page.pause();
})

test('@Web Screenshot & Visual comparison', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'screenshot.png'});
    await page.locator("#hide-textbox").click();
    //await page.screenshot({path: 'screenshot.png'});

    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('@Web Visual', async ({page}) => {
    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});