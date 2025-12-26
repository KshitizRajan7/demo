const { until, By } = require('selenium-webdriver');
const { getDriver } = require('../../utils/driver');
const { expect } = require('chai');
const signupData = require('../../data/signupData');
const path = require('path');
const signupActions = require('../../actions/signupActions');

describe('Business form test', function () {
    let driver;
    let data;

    before(async function () {
        driver = await getDriver();
        signupActions.setDriver(driver);
        data = signupData.businessDetails;
    });

    it('filling business form', async function () {

        this.timeout(20000);

        //arrange and act
        const fields = await signupActions.fillBusinessDetails(
            data.businessRegNumber,
            data.certification,
        )
      
        //Upload documents
        //pachhi dynamic banaunu parchha
        const fileInputs = await driver.findElements(By.css('input[type="file"]'));
        const filePath1 = path.resolve(__dirname, '../../docs/CompanyRegistration.pdf');
        const filePath2 = path.resolve(__dirname, '../../docs/EducationCertificate.pdf');
        await fileInputs[0].sendKeys(filePath1);
        await fileInputs[1].sendKeys(filePath2);

        //Asserting uploaded files
        expect(await fileInputs[0].getAttribute('value')).to.include('CompanyRegistration.pdf');
        expect(await fileInputs[1].getAttribute('value')).to.include('EducationCertificate.pdf');

        //add extra file container check garna ko lagi uploading third PDF
        const addDocsBtn = await driver.wait(
            until.elementLocated(By.xpath('//div[contains(text(),"Add Documents")]')),
            10000
        );
        await addDocsBtn.click();

        // Wait until a new file input is added
        await driver.wait(async () => {
            const inputs = await driver.findElements(By.css('input[type="file"]'));
            return inputs.length >= 3;
        }, 10000);

        const allFileInputs = await driver.findElements(By.css('input[type="file"]'));
        const thirdInput = allFileInputs[allFileInputs.length - 1];
        await thirdInput.sendKeys(path.resolve(__dirname, '../../docs/ExtraDoc.pdf'));
        expect(await thirdInput.getAttribute('value')).to.include('ExtraDoc.pdf');


        // Submitting 
        const submitBtn = await driver.findElement(By.css('button[type="submit"].primary-btn'));
        await submitBtn.click();

        //assertingg
        // Waiting for the "My Profile" heading 
        const myProfileHeading = await driver.wait(
            until.elementLocated(By.xpath('//h2[normalize-space()="My Profile"]')),
            30000
        );
        expect(await myProfileHeading.isDisplayed()).to.be.true;
    });
});
