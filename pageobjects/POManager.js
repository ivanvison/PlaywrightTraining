const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }
    
    getLoginPage() {
        return this.loginPage;
    }
    
    getCartPage() {
        return this.cartPage;
    }
    
    getDashboardPage() {
        return this.dashboardPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
    
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}

module.exports = {POManager}