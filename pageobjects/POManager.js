const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {ClientPage} = require('./ClientPage');
const {NewClientPage} = require('./NewClientPage');
const {ValidateClient} = require('./ValidateClient');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.clientPage = new ClientPage(this.page);
        this.newClientPage = new NewClientPage(this.page);
        this.validateClient = new ValidateClient(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    
    getDashboardPage() {
        return this.dashboardPage;
    }
    
    getClientPage() {
        return this.clientPage;
    }

    getNewClientPage() {
        return this.newClientPage;
    }    

    getValidateClient() {
        return this.validateClient;
    }

}
module.exports = {POManager}