//Use learned so far to automate registration and login to http://rahulshettyacademy.com/client

//Needed test annotation
const {test, expect} = require('@playwright/test');
const {POManager} = require('../OLDpageobjects/POManager');

test('End 2 End testing', async ({page}) => {

    const poManager = new POManager(page);
    //const context = await browser.newContext();
    //const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = 'adidas original';
    const userEmail = "ivanvison@outlook.com";
    const password = "Unicorn9";

    //Login Page
    page.route('**', route => route.continue());
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userEmail,password);

    //Dashboad
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    //Verify product is added
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy(); 

});