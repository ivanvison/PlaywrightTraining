Thank you for getting to this point. This repository was created for a project to learn Playwright with JS. "Playwright JS Automation Testing from Scratch with Framework" from UDEMY. For this training the instructor also provided a 3hours basic training in JavaScript. 

## Topics Covered
- Introduction
- Getting Started
- Playwright Basic Methods
- Handling UI Components
- Playwright Inspectors, Trace Viewers & Codegen tools
- E2E Web Automation
- Handling Web Dialogs, Frames & Events Listeners
- API Testing with Playwright and Build mix of Web & API Tests
- Session storage & Intercepting Network request/responses
- Perform Visual Testing with Playwright Algorithms
- Test Retries , Serial & Parallel execution & Tagging Tests in Playwright
- HTML & Allure Reporting & CI/CD Jenkins Integration

## Install / Usage Process (My personal setup)
1. Installed [VS Code](https://code.visualstudio.com).
2. Installed [NodeJS](https://nodejs.org).
3. Added Environment Variables (see below for Windows 10 PRO x64).
4. Create a folder > load in VS Code > open terminal and type `npm init playwright` this will download needed files.
    - Select JavaScript (in my case)
    - Folder name for tests: test
    - GitHub Actions: true

### Setting up Environment Variables in Windows 10 PRO x64

**Prerequisites:**
- NodeJS
- The path to `node.exe`, usually `C:\Program Files\nodejs`

1. Press Start > Write `environment` > Click `Edit the system variables environment`
2. Click Environment Variables
3. Under System variables, click New
    - Variable Name = NODE_HOME
    - Variable Value = C:\Program Files\nodejs
4. Ok > Ok

## Notes from the training per section

1. Setup & Basics
```
npx playwright test
Runs the end-to-end tests.

npx playwright test --project=chromium
Runs the tests only on Desktop Chrome.

npx playwright test tests\example.spec.js
Runs the tests of a specific file.

npx playwright test --debug
Runs the tests in debug mode.
```
- Before every step we need to write the keyword 'await' and add async to the function
- ()=> same as function() without names
- Playwright runs automatically in headless mode
- `npx playwright test --headed` to run in headed mode
- test.only('title', async({page})) => {...} here .only will force the runner to only run this test in the file
