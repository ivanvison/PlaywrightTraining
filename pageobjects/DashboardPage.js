const {test, expect} = require('@playwright/test');

class DashboardPage {

    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.locator("h1:has-text('Dashboard')");
        this.timelineText = page.locator(".timeline-body");
        this.clientMenuLink = page.locator(".main-sidebar >> text=Clients");
    }

    async validateDashboardTitle() {
        await this.page.waitForLoadState('networkidle');
        const bool = await this.dashboardTitle.isVisible();
        expect(bool).toBeTruthy();
    }

    async getTimelineContent() {
        const timelineLatestText = await this.timelineText.first().textContent();
        console.log(timelineLatestText);
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToClientPage() {
        await this.clientMenuLink.click();
    }

}

module.exports = {DashboardPage};