const { until, By } = require('selenium-webdriver');
const { baseUrl } = require('../../config/config');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const SignupActions = require('../../actions/signupActions');
const signupActions = require('../../actions/signupActions');

describe('dashboard  test', function () {
    let driver; // aba all it block can use this 

    before(async function () {
        this.timeout(20000);
        driver = await getDriver();
        await driver.get(baseUrl);
        signupActions.setDriver(driver);
    })


    it('finding the get started button', async function () {

        //arrange
        const getStartedButton = await signupActions.getGetStartedButton(); // getting element

        // asserting before the click
        expect(await getStartedButton.isDisplayed()).to.be.true;
        expect(await getStartedButton.getText()).to.equal('Get Started');

        //action
        //clicking the button 
        await SignupActions.clickButton(getStartedButton);  //click the element

        // asserting the navigation to next page
        const checkBox = await driver.wait(until.elementLocated(By.id('remember')), 60000);
        expect(await checkBox.isDisplayed()).to.be.true;
    })
})