const { Builder, By } = require('selenium-webdriver');
var should = require('chai').should(); // ,should() only if we using should for assert

//describe block

describe('visit the application', function () {

    //it block
    it('show the dashboard', async function () {
        // launch browser
        const driver = await new Builder().forBrowser('chrome').build();

        //navigate
        await driver.get('https://authorized-partner.vercel.app/');

        //find get started button
        const signupButton = await driver.findElement(By.css('button.primary-btn'));

        //assert 
        const isDisplayed = await signupButton.isDisplayed();
        isDisplayed.should.be.true; // chai assertion

        // Check text
        const text = await signupButton.getText();
        text.should.equal('Get Started'); // <-- Chai assertion

        //close browser
        await driver.quit();
    });

});





