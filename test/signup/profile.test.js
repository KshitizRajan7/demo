const { until, By, Select } = require('selenium-webdriver');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const signupPage = require('../../pages/signupPage');

describe('profile appearance test and locate logout button', function () {
    before(async function () {
        driver = await getDriver()
    })
    it('waiting for the profile to appear in screen', async function () {
        const myProfileHeading = await driver.wait(until.elementLocated(signupPage.myProfileHeading), 30000);
        await driver.wait(until.elementIsVisible(myProfileHeading), 30000);
        expect(await myProfileHeading.isDisplayed()).to.be.true;
    });
    it('clicking logout button', async function () {
        const logoutBtn = await driver.wait(until.elementLocated(signupPage.logoutButton), 10000);
        await driver.wait(until.elementIsVisible(logoutBtn), 5000);
        await driver.wait(until.elementIsEnabled(logoutBtn), 5000);
        expect(await logoutBtn.isDisplayed()).to.be.true;
        expect(await logoutBtn.isEnabled()).to.be.true;
        await logoutBtn.click();
        const modalLogoutBtn = await driver.wait(
            until.elementLocated(signupPage.confirmLogoutButton),
            5000
        );
        await driver.wait(until.elementIsVisible(modalLogoutBtn), 5000);
        expect(await modalLogoutBtn.isDisplayed()).to.be.true; 

    });
})