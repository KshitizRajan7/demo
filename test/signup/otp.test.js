const { until, By } = require("selenium-webdriver");
const { getDriver } = require("../../utils/driver");
const { expect } = require("chai");
const { tempEmail } = require("../../config/config");
const { getOtp } = require("../../utils/otpProvider");
const signupActions = require("../../actions/signupActions");

describe('OTP checking page', function () {

    let driver;

    before(async function () {
        driver = await getDriver();
        signupActions.setDriver(driver);
    })

    it('should check the option is valid or not and navigate to next page', async function () {

        this.timeout(20000);
        //arrange
        const otp = await getOtp(tempEmail);
        console.log("Fetched OTP:", otp);
        expect(otp).to.match(/^\d{6}$/);

        //arrange and action 
        const otpFill = await signupActions.fillOtp(otp);

         //assert before click
        expect(await otpFill.otpInput.getAttribute('value')).to.equal(otp);

        //action 
        //click on verify
        const submitOtp = await driver.findElement(By.css('button.primary-btn'));
        await driver.wait(until.elementIsVisible(submitOtp), 5000);
        await driver.wait(until.elementIsEnabled(submitOtp), 5000);
        expect(await submitOtp.isDisplayed()).to.be.true;
        await submitOtp.click();

        //assert for navigating to agency page
        const agencyName = await driver.wait(until.elementLocated(By.name('agency_name')), 10000);
        expect(await agencyName.isDisplayed()).to.be.true;

    })
})