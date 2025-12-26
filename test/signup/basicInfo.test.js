const { until, By } = require('selenium-webdriver');
const { tempEmail } = require('../../config/config');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const signupActions = require('../../actions/signupActions');
const signupData = require('../../data/signupData');
const { generateRandomPhone } = require('../../utils/dataGenerator');

describe('basicInfo form test', function () {
    let driver; //driver multiple it block ma use huna sakchaa 
    let data;
    let phone;
    before(async function () {
        this.timeout(20000);
        driver = await getDriver();
        signupActions.setDriver(driver);
        data = signupData.basicDetails;
        phone = generateRandomPhone()

    })
    it('should fill form and assert all fields', async function () {

        this.timeout(20000);

        //arrange and action
        const fields = await signupActions.fillBasicDetails(
            data.firstName,
            data.lastName,
            tempEmail,
            phone,
            data.password
        );

        //assert click action hunu agadi
        expect(await fields.firstNameInput.getAttribute('value')).to.equal(data.firstName);
        expect(await fields.lastNameInput.getAttribute('value')).to.equal(data.lastName);
        expect(await fields.emailInput.getAttribute('value')).to.equal(tempEmail);
        expect(await fields.phoneInput.getAttribute('value')).to.equal(phone);
        expect(await fields.passwordInput.getAttribute('value')).to.equal(data.password);
        expect(await fields.confirmPasswordInput.getAttribute('value')).to.equal(data.password);

        // action 
        // click on next
        const nextButton = await driver.findElement(By.css('button.primary-btn'));
        expect(await nextButton.isDisplayed()).to.be.true;
        await nextButton.click();

        //assert 
        //navigate to otp page
        const otpInput = await driver.wait(
            until.elementLocated(By.css('input[data-input-otp="true"]')),
            10000);
        await driver.wait(until.elementIsVisible(otpInput), 5000);
        expect(await otpInput.isDisplayed()).to.be.true;
    });
})
