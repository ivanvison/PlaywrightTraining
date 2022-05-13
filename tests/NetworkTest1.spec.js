const {test, expect, request} = require('@playwright/test');
const {APIUtils} =  require('./utils/APIUtils');
const loginPayLoad = {userEmail: "ivanvison@outlook.com", userPassword: "Unicorn9"};
const orderPayLoad = {orders:[{country: "Dominican Republic", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
const fakePayLoadOrders = {data:[], message:"No Orders"};

let response;

test.beforeAll( async()=> {
    const apiContext = await request.newContext();
    const utilsApi = new APIUtils(apiContext, loginPayLoad);
    response = await utilsApi.createOrder(orderPayLoad);
});

test.beforeEach( ()=> {

});


test('Network Test - Interception', async ({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);

    await page.route('**', route => route.continue());

    await page.goto("http://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/626beedae26b7e1a10e95b53", async route => {
        //Changing Brwoser mode to API mode
        const response = await page.request.fetch(route.request());
        
        // Send response back to browser to render in the front end
        let body = fakePayLoadOrders;
        route.fulfill({
            response,
            body,
        }); 
        //Intercepting the response - API will get the response > [fakeresponse - playwright - hijack] > Browser > Render data...
    });

    await page.locator("button[routerlink*='myorders']").click();
    //await page.pause();
    console.log(await page.locator(".mt-4").textContent());
});

