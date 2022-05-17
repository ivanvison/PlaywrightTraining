class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#email");
        this.password = page.locator("[type='password']");
        this.signInButton = page.locator("[name='submit_button']");
    }

    async goTo() {
        await this.page.goto("http://demo.fusioninvoice.com/");
    }

    async validLogin(userName,password) {
        await this.userName.type(userName)
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage};