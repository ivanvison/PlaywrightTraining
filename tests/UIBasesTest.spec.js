//Needed test annotation
const {test, expect} = require('@playwright/test');

test('Browser Context Test', async ({browser})=> {
    
    //Create context, one instance - fresh instance like incognito
    const context = await browser.newContext();
    const page = await context.newPage();
    //Reusable locators
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());

    //CSS and //Xpath
    await userName.type("iamroot");
    await password.type("unicorn");
    await signIn.click();

    //wait until this locator shows up in the page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');

    //type-fill methods to enter information
    await userName.fill("");
    await password.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    
    //Will make sure that these 2 steps are completed before login
    //NON SERVICE BASED APP
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    );

    //console.log(await page.locator(".card-body a").first().textContent()); //first
    //console.log(await page.locator(".card-body a").nth(1).textContent()); //Second

    const allTitle = await cardTitle.allTextContents();
    console.log(allTitle);
})

/* Adding .only runs only this test */
test('Page Test', async ({page})=> {
    await page.goto("https://www.google.com");
    //Get title then assertion

    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})

/* UI COntrol */
test('UI Controls', async ({browser})=> {
     //Create context, one instance - fresh instance like incognito
     const context = await browser.newContext();
     const page = await context.newPage();
     //Reusable locators
     const userName = page.locator("input#username");
     const password = page.locator("input#password");
     const signIn = page.locator("#signInBtn");

     const documentLink = page.locator("[href*='documents-request']");
   
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    //Returns Boolean
    expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    
    //await page.selectOption('[class*="form-control"]', 'consult');
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    console.log(await page.locator("#terms").isChecked());

    //Determine if a link is Blinking at the top
    //Assertion to check attribute value
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    await page.pause();
})

/* Handling Windows */
test.only('Windows Handle', async ({browser})=> {
    //Create context, one instance - fresh instance like incognito
    const context = await browser.newContext();
    const page = await context.newPage();
    //Reusable locators
     //Reusable locators
     const userName = page.locator("input#username");
     const password = page.locator("input#password");
     const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());

    //Determine if a link is Blinking at the top
    //Assertion to check attribute value
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await documentLink.click(),
    ]);
    const userValue = await newPage.locator(".copyright a").textContent();
    console.log(userValue);
    //Split text example
    /*
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    */
    await newPage.close();
    await userName.type(userValue);
    await page.pause();
})