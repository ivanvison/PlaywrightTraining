const {test, expect, request} = require('@playwright/test');
const {APIUtils} =  require('../utils/APIUtils');
const loginPayLoad = {userEmail: "ivanvison@outlook.com", userPassword: "Unicorn9"};
const orderPayLoad = {orders:[{country: "Dominican Republic", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let response;

test.beforeAll( async()=> {

    const apiContext = await request.newContext();
    const utilsApi = new APIUtils(apiContext, loginPayLoad);
    response = await utilsApi.createOrder(orderPayLoad);
    
});

test.beforeEach( ()=> {


});


test('@API API Integration test', async ({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);

    page.route('**', route => route.continue());

    await page.goto("http://rahulshettyacademy.com/client");
    console.log(await page.title());

    page.pause();

    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    
    for(let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (response.orderID.includes(rowOrderId)) {
            console.log("Order ID is present.");
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    //13. Verify the Order ID is the correct one
    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();

});

