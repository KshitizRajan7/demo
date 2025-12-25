const MailosaurClient = require('mailosaur');
const { Builder, By, until, Select } = require('selenium-webdriver');
const path = require('path');
var should = require('chai').should(); // ,should() only if we using should for assert

//describe block

describe('visit the application', function () {
    // because these will be used in multiple it block
    let driver;
    let tempEmail;

    const MAILOSAUR_API_KEY = 'wIjBAKPFaJ4WU2H1vxtoZpSALsjVnT0f';
    const SERVER_ID = 'dycq7pcr';
    const mailosaur = new MailosaurClient(MAILOSAUR_API_KEY);

    async function getOtp(tempEmail) {
        // Fetch the latest email sent to tempEmail
        const message = await mailosaur.messages.get(SERVER_ID, {
            sentTo: tempEmail
        });

        // Extract 6-digit OTP from email body
        const otp = message.text.body.match(/\d{6}/)[0];
        return otp;
    }

    before(async function () {
        // launch browser
        driver = await new Builder().forBrowser('chrome').build();

        //navigate
        await driver.get('https://authorized-partner.vercel.app/');
        await driver.manage().window().maximize();

        //tempEmail
        tempEmail = `user${Date.now()}@dycq7pcr.mailosaur.net`;

    })

    //it block
    //clicking get started button
    it('finding get started button and clicking', async function () {

        //clicking on the get started button for navigating to signup form
        const getStarted = await driver.findElement(By.css('button.primary-btn'));
        await getStarted.click();
    })

    //click on the checkbox for the agreement
    it('waiting for agreement check box and continue', async function () {

        //waiting for the checkbox to appear on the DOM for 10 seconds
        const checkbox = await driver.wait(until.elementLocated(By.id('remember')), 10000);
        await checkbox.click();

        //clicking on continue button
        const continueButton = await driver.findElement(By.css('button.primary-btn'));
        await continueButton.click();
    })

    //filling the form
    it('filling basic information form', async function () {

        const firstName = await driver.wait(until.elementLocated(By.name('firstName')), 10000);
        await firstName.sendKeys('Kshitiz');

        const lastName = await driver.findElement(By.name('lastName'));
        await lastName.sendKeys('Rajan');

        const email = await driver.findElement(By.name('email'));
        //temporary unique email is required for each test
        //so using mailasaur for this
        await email.sendKeys(tempEmail);

        const countryDropDown = await driver.findElement(By.css("select[aria-hidden='true'"));
        const countryDDcode = new Select(countryDropDown);
        await countryDDcode.selectByValue('+977-🇳🇵 +977');

        const phoneNumber = await driver.findElement(By.name('phoneNumber'));
        // for random unique phoneNumber in each test
        const randomPhone = '9' + Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
        await phoneNumber.sendKeys(randomPhone);

        const passwordField = await driver.findElement(By.name('password'));
        const passwordData = 'Password@123';
        await passwordField.sendKeys(passwordData);

        const confirmPassword = await driver.findElement(By.name('confirmPassword'));
        await confirmPassword.sendKeys(passwordData);

        //clicking next button
        const nextButton = await driver.findElement(By.css('button.primary-btn'));
        await nextButton.click();

    })

    // OTP fillup using Mailosaur

    it('getting otp to fill up and verify', async function () {
        const otpInput = await driver.wait(until.elementLocated(By.css('input[data-input-otp="true"]')), 30000);
        const otp = await getOtp(tempEmail);
        console.log("Fetched OTP:", otp);
        await otpInput.sendKeys(otp);

        const submitOtp = await driver.findElement(By.css('button.primary-btn'));
        await submitOtp.click();

    })


    //agency form fill up 

    it('agency form fill up', async function () {


        //fill name 
        const agencyName = await driver.wait(until.elementLocated(By.name('agency_name')));
        await agencyName.sendKeys('My Test Agency');

        // 2️⃣ Fill Role in Agency
        const roleInAgency = await driver.findElement(By.name('role_in_agency'));
        await roleInAgency.sendKeys('Manager');

        // 3️⃣ Fill Agency Email
        const agencyEmail = await driver.findElement(By.name('agency_email'));
        await agencyEmail.sendKeys('test@email.com');

        // 4️⃣ Fill Agency Website
        const agencyWebsite = await driver.findElement(By.name('agency_website'));
        await agencyWebsite.sendKeys('myagency.com');

        // 5️⃣ Fill Agency Address
        const agencyAddress = await driver.findElement(By.name('agency_address'));
        await agencyAddress.sendKeys('123 Test Street, Kathmandu');

        // 6️⃣ Select Region of Operation
        const regionButton = await driver.wait(until.elementLocated(By.css('button[role="combobox"]')), 5000);
        await regionButton.click();

        // Wait for dropdown to open and select first region (adjust as needed)
        const firstRegion = await driver.wait(
            until.elementLocated(By.css('div[data-state="open"] div span')),
            5000
        );
        await firstRegion.click();

        // 7️⃣ Click Next button (submit)
        const next = await driver.findElement(
            By.css('button[type="submit"].primary-btn')
        );
        await next.click();
    })


    //experience form fill up 
    it('filling experience form', async function () {

        // 1️⃣ Select Years of Experience (dropdown)
        const experienceDropdown = await driver.wait(until.elementLocated(
            By.css('button[role="combobox"]')
        ));
        await experienceDropdown.click();

        // Wait for dropdown options to be visible and click the desired one
        const experienceOption = await driver.wait(
            until.elementLocated(By.xpath('//select/option[@value="3"]')), // 3 years as example
            5000
        );
        await experienceOption.click();

        // 2️⃣ Fill Number of Students Recruited Annually
        const studentsInput = await driver.findElement(
            By.name('number_of_students_recruited_annually')
        );
        await studentsInput.sendKeys('50');

        // 3️⃣ Fill Focus Area
        const focusArea = await driver.findElement(By.name('focus_area'));
        await focusArea.sendKeys('Undergraduate admissions to Canada');

        // 4️⃣ Fill Success Metrics
        const successMetrics = await driver.findElement(By.name('success_metrics'));
        await successMetrics.sendKeys('90');

        // 5️⃣ Select Services Provided (checkboxes)
        const services = ['Career Counseling', 'Admission Applications', 'Visa Processing', 'Test Prepration'];
        for (let service of services) {
            const checkboxLabel = await driver.findElement(
                By.xpath(`//label[text()="${service}"]/preceding-sibling::button`)
            );
            await checkboxLabel.click();
        }

        // 6️⃣ Click Next (submit)
        const nextButtonExp = await driver.findElement(
            By.css('button[type="submit"].primary-btn')
        );
        await nextButtonExp.click();
    })

    // bussiness form fill up 
    it('filling business form', async function () {

        // 1️⃣ Fill Business Registration Number
        const businessReg = await driver.wait(until.elementLocated(By.name('business_registration_number')));
        await businessReg.sendKeys('BRN123456');

        // 2️⃣ Select Preferred Countries (open dropdown and select first option)
        const countryDropdown = await driver.wait(until.elementLocated(By.xpath('//button[contains(@id,"r8q")]')), 5000);
        await countryDropdown.click();
        const firstCountry = await driver.wait(
            until.elementLocated(By.css('div[data-state="open"] div span')),
            5000
        );
        await firstCountry.click();

        // 3️⃣ Select Preferred Institution Types (checkboxes)
        const institutionTypes = ['Universities', 'Colleges', 'Vocational School', 'Other'];
        for (let type of institutionTypes) {
            const checkbox = await driver.findElement(
                By.xpath(`//label[text()="${type}"]/preceding-sibling::button`)
            );
            await checkbox.click();
        }

        // 4️⃣ Fill Certification Details (optional)
        const certDetails = await driver.findElement(By.name('certification_details'));
        await certDetails.sendKeys('ICEF Certified Education Agent');

        // 5️⃣ Upload documents
        const fileInputs = await driver.findElements(By.css('input[type="file"]'));
        const filePath1 = path.resolve(__dirname, '../docs/CompanyRegistration.pdf');
        const filePath2 = path.resolve(__dirname, '../docs/EducationCertificate.pdf');
        await fileInputs[0].sendKeys(filePath1);
        await fileInputs[1].sendKeys(filePath2);


        // Upload third PDF (same way as first two)

        // Click Add Documents to create a new file input
        const addDocsBtn = await driver.wait(
            until.elementLocated(By.xpath('//div[contains(text(),"Add Documents")]')),
            10000
        );
        await addDocsBtn.click();

        // Wait until a NEW file input is added
        await driver.wait(async () => {
            const inputs = await driver.findElements(By.css('input[type="file"]'));
            return inputs.length >= 3;
        }, 10000);

        // Get all file inputs again
        const allFileInputs = await driver.findElements(By.css('input[type="file"]'));

        // Always send to the LAST one
        const thirdInput = allFileInputs[allFileInputs.length - 1];

        await thirdInput.sendKeys(
            path.resolve(__dirname, '../docs/ExtraDoc.pdf')
        );

        console.log('Extra PDF uploaded successfully');


        console.log('Extra PDF uploaded');

        // 6️⃣ Click Submit
        const submitBtn = await driver.findElement(
            By.css('button[type="submit"].primary-btn')
        );
        await submitBtn.click();
    })

    it('waiting for the profile to appear in screen', async function () {

        //asserting profile to appear on screen
        const myProfileHeading = await driver.wait(
            until.elementLocated(
                By.xpath('//h2[normalize-space()="My Profile"]')
            ),
            30000
        );

        // Optional visibility check
        await driver.wait(until.elementIsVisible(myProfileHeading), 30000);
    })


    //clicking for the  on the logout button
    it('clicking logout button', async function () {

        const logoutBtn = await driver.wait(
            until.elementLocated(
                By.xpath('//div[normalize-space()="Logout"]')
            ),
            10000
        );
        await driver.wait(until.elementIsVisible(logoutBtn), 5000);
        await logoutBtn.click();
    })

    it('Logout modal to appear', async function () {

        //waiting 
        const openDialog = await driver.wait(
            until.elementLocated(
                By.css('div[role="dialog"][data-state="open"]')
            ),
            10000
        );

        // Ensure dialog is visible
        await driver.wait(until.elementIsVisible(openDialog), 5000);

        // Click the Logout button INSIDE the open dialog
        const confirmLogout = await openDialog.findElement(
            By.xpath('.//button[normalize-space()="Logout"]')
        );
        await confirmLogout.click();

    })

    after(async function () {
        // close browser
        await driver.quit();
    })


});





