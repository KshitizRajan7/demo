const { until, By } = require("selenium-webdriver");
const { getDriver } = require("../../utils/driver");
const { expect } = require("chai");
const signupActions = require("../../actions/signupActions");


describe('Agreement Checkbox click and continue', function () {
    let driver;
    before(async function () {
        this.timeout(60000); 
        driver = await getDriver();
        signupActions.setDriver(driver);
    })
    it('find and click the checkbox', async function () {

        //arrange
        const checkBox = await signupActions.getRememberCheckBox(); // getting the checkbox;

        //chai assertion before click
        expect(await checkBox.isDisplayed()).to.be.true;

        //action 
        //clicking checkbox
        await signupActions.clickButton(checkBox);

        //asserting if the checkbox is checked
        const checked = await checkBox.getAttribute('aria-checked');//relocating checkbox checked chha ki vanera
        expect(checked).to.equal('true');
    })

    it('find and click continue button', async function () {
        //arrange 
        //continue button lai locate garem
        const continueButton = await signupActions.getContinueButton();

        //chai assert to see if it has the required text
        expect(await continueButton.isDisplayed()).to.be.true;
        expect(await continueButton.getText()).to.equal('Continue');

        //clicking the button
        await signupActions.clickButton(continueButton);

        //asserting the page navigation 
        //firstName ko container chha ki chhaina vanera
        const firstName = await driver.wait(until.elementLocated(By.name('firstName')), 60000);
        expect(await firstName.isDisplayed()).to.be.true;
    })
})