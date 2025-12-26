const { until, By, Select } = require('selenium-webdriver');
const { getDriver, quitDriver } = require('../../utils/driver');
const { expect } = require('chai');


describe('Logout modal test', function () {
    before(async function () {
        driver = await getDriver()
    })
     after(async function () {
        await quitDriver(); // quit at the end of the flow
    });
    it('should click the logout button and navigate to login page', async function () {
        const openDialog = await driver.wait(until.elementLocated(By.css('div[role="dialog"][data-state="open"]')), 10000);
        await driver.wait(until.elementIsVisible(openDialog), 5000);
        expect(await openDialog.isDisplayed()).to.be.true;

        const confirmLogout = await openDialog.findElement(By.xpath('.//button[normalize-space()="Logout"]'));
        await driver.wait(until.elementIsVisible(confirmLogout), 5000);
        await driver.wait(until.elementIsEnabled(confirmLogout), 5000);
        expect(await confirmLogout.isDisplayed()).to.be.true;
        expect(await confirmLogout.isEnabled()).to.be.true;
        await confirmLogout.click();

        const loginHeading = await driver.wait(until.elementLocated(By.xpath('//h1[normalize-space()="Log in to Authorized Partner"]')), 10000);
        expect(await loginHeading.isDisplayed()).to.be.true;
    })
})