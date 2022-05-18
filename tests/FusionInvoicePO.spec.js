/*Original testing file were giving me issues, making it difficul to move forward.
Decided to change the project test to Fusion Invoice. Login, validate, create customer, validate the creation in the list*/

const {text, expect, default: test} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

test('Fusion Invoice Client creation', async ({page}) => {
    const poManager = new POManager(page);
    const userName = "demo@fusioninvoice.com";
    const password = "demopass";

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName,password);
 
    //Dashboard Validation
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.validateDashboardTitle();
    await dashboardPage.getBoxesContent();

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