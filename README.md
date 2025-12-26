# Selenium Signup Automation — README

## Project Overview

## Structured Testing Approach
- **Page Object Model (POM):** Keeps element locators separate for easy maintenance.  
- **Action-Oriented Pattern:** Reusable functions for common user actions like form filling and OTP handling.  
- **Mock/Test Data:** Uses temporary emails, random phone numbers, and predefined passwords.  
- **Tech Stack:** JavaScript, Mocha, Selenium WebDriver.  
- **OTP Handling:** Mailosaur is used for automated OTP verification.  
- **Reporting:** Mochawesome generates detailed test reports.

## Contents
- Tests: test/ (includes signup/*.test.js and signup_automation_script.test.js)
- Page objects: signupPage.js
- Actions: signupActions.js
- Test utilities: utils/ (dataGenerator.js, driver.js, otpProvider.js)
- Test report output: mochawesome-report/

## Prerequisites
Before running tests, ensure you have:
- Node.js (recommended LTS, e.g., 18.x or later)
- npm (comes with Node.js)
- Google Chrome (stable) — note the exact Chrome version (Menu → Help → About Chrome)
- ChromeDriver matching your Chrome version
- Internet access for downloading packages and any third-party test email services

## Environment / Setup
Language & framework:
- JavaScript (Node.js)
- Test runner: Mocha
- Assertion: Chai
- Reporter: Mochawesome
- Selenium client: selenium-webdriver


Installation steps :
1. Open a terminal in the project root.
2. Install project dependencies:
```bash
npm install
```
3. Install ChromeDriver (one of the options below):
- Option A — manual download:
  - Download ChromeDriver matching your Chrome version from https://chromedriver.chromium.org/downloads
  - Unzip and place the executable in a folder on PATH (or note its location for driver config).
- Option B — npm installer (simpler, but ensure version matches Chrome):
```bash
npm install -g chromedriver
```
4. (Optional) If your tests use Mailosaur for temporary email, configure Mailosaur credentials:
- Set environment variables or update mailosaur.js with your Mailosaur Server ID and API key.
- Example environment variables:
```powershell
# Windows PowerShell
$env:MAILOSAUR_API_KEY="your_api_key"
$env:MAILOSAUR_SERVER_ID="your_server_id"
```

## Running the Script
Run all tests (uses the script defined in package.json):
```bash
npm test
```

Run a specific test file:
```bash
npx mocha path/to/testfile --no-timeouts --reporter mochawesome
```
Example:
```bash
npx mocha test/signup/basicInfo.test.js --no-timeouts --reporter mochawesome
```

Run a specific test folder:
```bash
npx mocha "test/signup/**/*.test.js" --no-timeouts --reporter mochawesome
```

## Test Data / Accounts
- Temporary emails:
  - Mailosaur is included as a dependency — use it to create temporary email addresses for OTP verification without using real personal emails.
  - If not using Mailosaur, use disposable email services for test accounts.
- Random phone numbers & passwords:
  - The project contains dataGenerator.js (use this to generate random phone numbers, names, and passwords).
  - Example pattern for test passwords: a mix of letters, numbers, and a symbol (e.g., TestPass123!).
- Important: Do NOT use real production accounts or personal credentials in tests. Use throwaway/test-only accounts or services like Mailosaur.
- If tests require OTP retrieval, otpProvider.js and mailosaur.js are provided to fetch OTPs automatically.

## Test Report
- Test reports are generated with Mochawesome.
- Default output: mochawesome.html and mochawesome.json
- After running `npm test`, open the HTML report in your browser:
  - Windows Explorer → open mochawesome.html
  - or from terminal:
```powershell
start mochawesome-report\mochawesome.html
```
- The report contains summary, test details, and embedded screenshots if tests capture them.


## Quick Checklist
- [ ] Install Node.js and npm
- [ ] Run `npm install`
- [ ] Install compatible ChromeDriver
- [ ] Configure Mailosaur or disposable email (if using OTP flows)
- [ ] Run `npm test`
- [ ] Open mochawesome.html to review results
