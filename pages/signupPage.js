const { By } = require("selenium-webdriver");

class SignupPage {
    //locators

    //dashboard
    getStartedButton = By.css('button.primary-btn'); //open signup button
    rememberCheckBox = By.id('remember'); // agreement checkbox

    //basic Info
    firstNameInput = By.name('firstName'); // First Name input field
    lastNameInput = By.name('lastName'); // Last Name input field
    emailInput = By.name('email'); // Email input field
    countryDropdown = By.css("select[aria-hidden='true']"); // Country selection dropdown
    phoneInput = By.name('phoneNumber'); // Phone number input field
    passwordInput = By.name('password'); // Password input field
    confirmPasswordInput = By.name('confirmPassword'); // Confirm password input field

    //otp
    otpInput = By.css('input[data-input-otp="true"]'); // OTP input field

    //agency
    agencyNameInput = By.name('agency_name'); // Agency name input
    roleInput = By.name('role_in_agency'); // Role in agency input
    agencyEmailInput = By.name('agency_email'); // Agency email input
    websiteInput = By.name('agency_website'); // Website input
    addressInput = By.name('agency_address'); // Address input
    regionDropdownButton = By.css('button[role="combobox"]'); // Region dropdown button
    firstRegionOption = By.css('div[data-state="open"] div span'); // First option in region dropdown
    agencySubmitButton = By.css('button[type="submit"].primary-btn'); // Submit agency details

    //experience
    experienceDropdown = By.css('button[role="combobox"]'); // Experience dropdown
    selectDDOption = By.xpath('//select/option[@value="3"]'); // select option form experience dd
    studentsInput = By.name('number_of_students_recruited_annually'); // Students recruited annually
    focusAreaInput = By.name('focus_area'); // Focus area input
    successMetricsInput = By.name('success_metrics'); // Success metrics input

    //business 
    businessRegInput = By.name('business_registration_number'); // Business registration number
    preferredCountryDropdown = By.xpath('//button[.//span[text()="Select Your Preferred Countries"]]'); // Preferred country dropdown
    firstCountryOption = By.css('div[data-state="open"] div span'); // First country option
    certDetailsInput = By.name('certification_details'); // Certification details input

    //document upload
    fileInputs = By.css('input[type="file"]'); // File input fields
    addDocsButton = By.xpath('//div[contains(text(),"Add Documents")]'); // "Add Documents" button

    //submit
    submitButton = By.css('button[type="submit"].primary-btn'); // Submit button

    //logout
    myProfileHeading = By.xpath('//h2[normalize-space()="My Profile"]'); // My Profile page heading
    logoutButton = By.xpath('//div[normalize-space()="Logout"]'); // Logout button
    logoutDialog = By.css('div[role="dialog"][data-state="open"]'); // Logout confirmation dialog
    confirmLogoutButton = By.css('button.bg-destructive'); // Confirm logout button inside dialog
}

module.exports = new SignupPage;