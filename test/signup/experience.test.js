const { until, By } = require('selenium-webdriver');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const signupActions = require('../../actions/signupActions');
const signupData = require('../../data/signupData');


describe('Experience form test', function () {
    let driver;
    let data;

    before(async function () {
         this.timeout(20000);
        driver = await getDriver();
        signupActions.setDriver(driver);
        data = signupData.experienceDetails;
        console.log(data);
    });

    it('should navigate to Business page with valid information', async function () {

        this.timeout(20000);

        //arrange and act 

         const fields = await signupActions.fillExperienceDetails(
            data.yearsOfExperience,
            data.studentsRecruitedAnnually,
            data.focusArea,
            data.successMetrics,
            data.services
        );

        //assertingg..
        // dropdown text sanga selected option match hunu paryoo

        const selectedDropdown = await driver.findElement(By.css('button[role="combobox"] > span'));
        const selectedText = await selectedDropdown.getText();
        expect(selectedText).to.equal(fields.selectedText);

        expect(await fields.focusAreaInput.getAttribute("value"))
            .to.equal(data.focusArea);

        expect(await fields.successMetricsInput.getAttribute("value"))
            .to.equal(data.successMetrics);
        
        // retun vako services array sanga action match hunuparyoo 
        expect(fields.selectedServices).to.deep.equal(data.services);

        
        const nextButtonExp = await driver.findElement(By.css('button[type="submit"].primary-btn'));
        await driver.wait(until.elementIsVisible(nextButtonExp), 5000);
        await driver.wait(until.elementIsEnabled(nextButtonExp), 5000);
        await nextButtonExp.click();

        //asserting after click act
        //next ma click pachii navigate hunu paryop

        const registrationInput = await driver.wait(until.elementLocated(By.name('business_registration_number')), 5000);
        expect(await registrationInput.isDisplayed()).to.be.true;

    });
});
