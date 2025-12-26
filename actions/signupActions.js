const { until, Select, By } = require('selenium-webdriver');
const path = require('path');
const signupPage = require('../pages/signupPage');

class SignupActions {
    driver = null;
    setDriver(driver) {
        this.driver = driver;
    }

    async getGetStartedButton() {
        console.log(signupPage.getStartedButton);
        const btn = await this.driver.wait(until.elementLocated(signupPage.getStartedButton), 60000);
        await this.driver.wait(until.elementIsVisible(btn), 60000);
        return btn;  
    }

    async clickButton(element) {
        await element.click(); 
    }


    async getRememberCheckBox() {
        const checkBox = await this.driver.wait(until.elementLocated(signupPage.rememberCheckBox), 60000);
        await this.driver.wait(until.elementIsVisible(checkBox), 5000);
        return checkBox;
    }

    async getContinueButton() {
        const continueButton = await this.driver.wait(until.elementLocated(By.css('button.primary-btn')), 5000);
        await this.driver.wait(until.elementIsVisible(continueButton), 5000);
        await this.driver.wait(until.elementIsEnabled(continueButton), 5000); //as enables only after checked
        return continueButton;
    }

    //fill up the basic info form 
    async fillBasicDetails(firstName, lastName, email, phone, password) {
        const firstNameInput = await this.driver.wait(until.elementLocated(signupPage.firstNameInput), 5000);
        await firstNameInput.sendKeys(firstName);

        const lastNameInput = await this.driver.findElement(signupPage.lastNameInput);
        await lastNameInput.sendKeys(lastName);

        const emailInput = await this.driver.findElement(signupPage.emailInput);
        await emailInput.sendKeys(email);

        const phoneInput = await this.driver.findElement(signupPage.phoneInput);
        await phoneInput.sendKeys(phone);

        const passwordInput = await this.driver.findElement(signupPage.passwordInput);
        await passwordInput.sendKeys(password);

        const confirmPasswordInput = await this.driver.findElement(signupPage.confirmPasswordInput);
        await confirmPasswordInput.sendKeys(password);
      
        return { firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput };
    }

    //fill otp
    async fillOtp(otp) {
        if (!this.driver) throw new Error("Driver not set in signupActions");
        const otpInput = await this.driver.wait(until.elementLocated(signupPage.otpInput), 30000);
        await otpInput.sendKeys(otp);

        return { otpInput };
    }

    //fill agency details
    async fillAgencyDetails(Aname, role, Aemail, website, address) {
        const agencyName = await this.driver.wait(until.elementLocated(signupPage.agencyNameInput), 10000)
        await agencyName.sendKeys(Aname);

        const roleInAgency = await this.driver.findElement(signupPage.roleInput);
        await roleInAgency.sendKeys(role);

        const agencyEmail = await this.driver.findElement(signupPage.agencyEmailInput)
        await agencyEmail.sendKeys(Aemail);

        const agencyWebsite = await this.driver.findElement(signupPage.websiteInput)
        await agencyWebsite.sendKeys(website);

        const agencyAddress = await this.driver.findElement(signupPage.addressInput)
        await agencyAddress.sendKeys(address);

        const regionButton = await this.driver.wait(until.elementLocated(signupPage.regionDropdownButton), 5000);
        await this.driver.wait(until.elementIsVisible(regionButton), 5000);
        await this.driver.wait(until.elementIsEnabled(regionButton), 5000);
        await regionButton.click();

        const firstRegion = await this.driver.wait(until.elementLocated(signupPage.firstRegionOption), 5000);
        await firstRegion.click();

        return {agencyName,roleInAgency,agencyEmail,agencyWebsite,agencyAddress,regionButton,firstRegion
        };
    }

    // fill experience details
    async fillExperienceDetails(experienceYears, students, focusArea, successMetrics, services) {

        // experience dropdown
        const experienceDropdown = await this.driver.wait(until.elementLocated(By.css('button[role="combobox"]')),20000);
        await this.driver.wait(until.elementIsVisible(experienceDropdown), 20000);
        await this.driver.wait(until.elementIsEnabled(experienceDropdown), 20000);
        await experienceDropdown.click();

        // selecting experience 
        const experienceOption = await this.driver.wait(until.elementLocated(By.xpath('//select/option[@value="3"]')), 20000);
        await experienceOption.click();

        const selectedDropdown = await this.driver.findElement(By.css('button[role="combobox"] > span'));
        const selectedText = await selectedDropdown.getText();

        // students
        const studentsInput = await this.driver.wait(
            until.elementLocated(signupPage.studentsInput),
            10000
        );
        await studentsInput.sendKeys(students);

        // focus area
        const focusAreaInput = await this.driver.wait(
            until.elementLocated(signupPage.focusAreaInput),
            10000
        );
        await focusAreaInput.sendKeys(focusArea);

        // success metrics
        const successMetricsInput = await this.driver.wait(
            until.elementLocated(signupPage.successMetricsInput),
            10000
        );
        await successMetricsInput.sendKeys(successMetrics);

        // selecting service checkboxes
        const selectedServices = [];

        for (let service of services) {

            const serviceOption = await this.driver.wait(
                until.elementLocated(
                    By.xpath(`//label[normalize-space(text())='${service}']/preceding-sibling::button`)
                ),
                10000
            );

            await serviceOption.click();
            selectedServices.push(service);
        }

        return {
            experienceDropdown,
            selectedText,
            studentsInput,
            focusAreaInput,
            successMetricsInput,
            selectedServices
        };
    }

    // to fill Business Details
    async fillBusinessDetails(businessRegNumber,certName) {
        
        // Business Reg Number
        const businessReg = await this.driver.wait(
            until.elementLocated(signupPage.businessRegInput),
            10000
        );
        await businessReg.sendKeys(businessRegNumber);

        // Country dropdown
        const countryDropdown = await this.driver.wait(
            until.elementLocated(signupPage.preferredCountryDropdown),
            10000
        );
        await this.driver.wait(until.elementIsVisible(countryDropdown), 5000);
        await this.driver.sleep(500); 
        await countryDropdown.click();

        // Select first country
        const firstCountry = await this.driver.wait(
            until.elementLocated(signupPage.firstCountryOption),
            10000
        );
        const countryName = await firstCountry.getText(); // store the selected country name
        await firstCountry.click();

        // Institution types
        const institutionTypes = ['Universities', 'Colleges', 'Vocational School', 'Other'];
        for (let type of institutionTypes) {
            const checkbox = await this.driver.findElement(
                By.xpath(`//label[text()="${type}"]/preceding-sibling::button`)
            );
            await checkbox.click();
            await this.driver.sleep(200); // wait for state update
            const isChecked = await checkbox.getAttribute('aria-checked');
            expect(isChecked).to.equal('true');
        }

        // Certification details
        const certDetails = await this.driver.findElement(signupPage.certDetailsInput);
        await certDetails.sendKeys(certName);

        return {
            businessReg,
            countryDropdown,
            firstCountry,
            countryName,
            certDetails
        };
    }


    // Upload Documents
    async uploadDocuments() {
        const fileInputs = await this.driver.findElements(signupPage.fileInputs);
        const filePath1 = path.resolve(__dirname, '../../docs/CompanyRegistration.pdf');
        const filePath2 = path.resolve(__dirname, '../../docs/EducationCertificate.pdf');
        await fileInputs[0].sendKeys(filePath1);
        await fileInputs[1].sendKeys(filePath2);

        //upload third PDF
        const addDocsBtn = await this.driver.wait(
            until.elementLocated(signupPage.addDocsButton),
            10000
        );
        await addDocsBtn.click();

        // Wait until a new file input is added
        await this.driver.wait(async () => {
            const inputs = await this.driver.findElements(signupPage.fileInputs);
            return inputs.length >= 3;
        }, 10000);

        const allFileInputs = await this.driver.findElements(signupPage.fileInputs);
        const thirdInput = allFileInputs[allFileInputs.length - 1];
        await thirdInput.sendKeys(path.resolve(__dirname, '../../docs/ExtraDoc.pdf'));
    }

}

module.exports = new SignupActions;