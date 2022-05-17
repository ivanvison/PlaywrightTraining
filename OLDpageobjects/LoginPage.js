class LoginPage {

    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("[type='submit']");
    }

    async goTo() {
        await this.page.goto("http://rahulshettyacademy.com/client");
    }

    async validLogin(userEmail,password) {
        await this.userEmail.type(userEmail)
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage};