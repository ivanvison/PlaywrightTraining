/*Original testing file were giving me issues, making it difficul to move forward.
Decided to change the project test to Fusion Invoice. Login, validate, create customer, validate the creation in the list*/

const {text, expect, default: test} = require('@playwright/test');
const {customTest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
// JSON -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/fusioninvoiceTestData.json")));

// For data set (multiple test data) encapsule inside for-loop
// ${data.userType} is no differentiate the test data from the Json... ` this quote type is important
for(const data of dataset) {
test(`Fusion Invoice Client creation ${data.userType}`, async ({page}) => {
    const poManager = new POManager(page);

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName,data.password);
 
    //Dashboard Validation
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.validateDashboardTitle();
    await dashboardPage.getTimelineContent();

    //Client Section and Validation
    await dashboardPage.navigateToClientPage();
    const clientPage = poManager.getClientPage();
    await clientPage.validateClientPageTitle();
    await clientPage.navigateToNewClientPage();

    //Add New Client
    const newClientPage = poManager.getNewClientPage();
    const randomName = await newClientPage.generateRandomName();
    await newClientPage.fillNewClientForm(randomName);
    await dashboardPage.navigateToClientPage();

    //Validate Created Client
    const validateClient = poManager.getValidateClient();
    await validateClient.clientNameValidation(randomName);
    await validateClient.printClientResults();

});
} //EO For-loop

customTest('Login Using Custom Test', async ({page,testDataForLogin}) => {
    const poManager = new POManager(page);

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForLogin.userName,testDataForLogin.password);

    //<div class="alertify-notifier ajs-top ajs-center" xpath="1"><div class="ajs-message ajs-error ajs-visible">Invalid Credentials</div></div>
    await page.waitForLoadState('networkidle');
    if(await page.locator("text=Invalid Credentials").isVisible) {
        console.log("Invalid Credentials")
    }
});

