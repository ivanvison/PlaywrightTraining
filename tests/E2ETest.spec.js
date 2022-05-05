//Use learned so far to automate registration and login to http://rahulshettyacademy.com/client

//Needed test annotation
const {test, expect} = require('@playwright/test');

test('End 2 End testing', async ({page}) => {

    //const context = await browser.newContext();
    //const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = 'adidas original';
    const userEmail = "ivanvison@outlook.com";

    await page.goto("http://rahulshettyacademy.com/client");
    console.log(await page.title());

    //1. Register
        // This is already done in another test. 

    //2. Login
    await page.locator("#userEmail").type(userEmail)
    await page.locator("#userPassword").type("Unicorn9");
    await page.locator("[type='submit']").click();

    //3. Add product to cart - IPHONE 13 PRO
    await Promise.all(
        [
            page.waitForNavigation(),
        ]
    );
    await page.waitForLoadState('networkidle');

    console.log(await page.locator(".card-body b").first().textContent());
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    console.log(count);
    for(let i = 0; i < count; ++i ) {
        console.log(await products.nth(i).locator("b").textContent());
        if(await products.nth(i).locator("b").textContent() === productName) {
            //acc to cart
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    //4. Go to cart
    await page.locator("[routerlink*='cart']").click();

    //5. Verify product added is the same
    await page.locator("div li").first().waitFor(); // Method to hold the test until items are loaded
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();

    //6. Checkout
    await page.locator("text=Checkout").click();

    //7. Enter CC and Coupon
    await page.locator('input[type="text"]').first().fill('');
    await page.locator('input[type="text"]').first().fill('8888-8888-8888-8888');
    await page.locator('select').first().selectOption('12');
    await page.locator('select').nth(1).selectOption('29');
    await page.locator('input[type="text"]').nth(1).fill('288');
    await page.locator('input[type="text"]').nth(2).fill('Unicorn Rainbows');
    await page.locator('input[type="text"]').nth(3).fill('rahulshettyacademy');

    //8. Verify email
    //Method 1
    const emailValidation = await page.locator(".user__name label").textContent();
    console.log(emailValidation);
    await expect(page.locator(".user__name label")).toHaveText(userEmail);

    /*Method 2
    await expect(page.locator(".user__name [type='text']").toHaveText(userEmail);
    */

    //9. Select Country for Shipping
    await page.locator("[placeholder*='Country']").type("Dom", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; i++) {
        country = await dropdown.locator("button").nth(i).textContent();
        console.log(country);
        if (country === " Dominican Republic") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    console.log("---");
    //console.log(await page.locator(".form-control").inputValue());

    //10 Place order, make sure thank you message is present in confirmation page
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //11. Copy order ID, click order history and search n the list
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("text= Orders History Page ").click();

    //12. Verify the order again in the list

    /*Method created by Me for this assignment
    orderID = orderID.slice(0, orderID.length - 1);
    orderID = orderID.trim();
    console.log(orderID);

    rowsCount = await page.locator(".table .ng-star-inserted [scope='row']").count();
    for(let i = 0; i < rowsCount; i++) {
        cellValue = await page.locator(".table .ng-star-inserted [scope='row']").nth(i).textContent();
        console.log(cellValue);
        if (cellValue === orderID) {
            console.log("Order ID is present.");
            break;
        }
        else {
            console.log("Order ID is not present.");
            break;
        }
    }*/

    //Method created by Rahul
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (orderID.includes(rowOrderId)) {
            console.log("Order ID is present.");
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    //13. Verify the Order ID is the correct one
    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

});