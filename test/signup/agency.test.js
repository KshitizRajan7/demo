const { until, By, Select } = require('selenium-webdriver');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const signupActions = require('../../actions/signupActions');
const signupData = require('../../data/signupData');

describe('Agency form test', function () {
    let driver;
    let data;
    before(async function () {
        this.timeout(20000);
        driver = await getDriver();
        signupActions.setDriver(driver);
        data = signupData.agencyDetails;
    })
    it('should navigate to experience page with information', async function () {

        this.timeout(20000);

        //arrange and action 
        //pachhi next garnu aghi assert garnu parchhaa 
        const fields = await signupActions.fillAgencyDetails(
            data.agencyName,
            data.roleInAgency,
            data.email,
            data.website,
            data.address
        )

        const next = await driver.findElement(By.css('button[type="submit"].primary-btn'));
        await driver.wait(until.elementIsVisible(next), 5000);
        await driver.wait(until.elementIsEnabled(next), 5000);
        await next.click();

    
        //asserting 
        //navigate hune thau ko element display vayo ki vayena vandaii
        const experienceDropdown = await driver.wait(until.elementLocated(By.css('button[role="combobox"]')), 20000);
        expect(await experienceDropdown.isDisplayed()).to.be.true;

    })
})
