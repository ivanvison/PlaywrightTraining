Thank you for getting to this point. This repository was created for a project to learn Playwright with JS. "Playwright JS Automation Testing from Scratch with Framework" from UDEMY. For this training the instructor also provided a 3hours basic training in JavaScript. Trainer: Rahul Shetty.

Note: By section 11 I had to change the example being used for training. For some reason I was investing too much time troubleshooting the teacher's code on my end. I decided to take a project that had an online demo instance that I could use. I picked "Fusion Invoice". That demo resets every X amount of minutes so it made sense. I created the whole testing process for: Login, Random Dashboad Verification, Client list verification, New client creation and the validation of the created client. -- The purpose was to be able to continue with the training instead of troubleshooting. 

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
- Page Object Patterns & Data Driven Parameterization for Playwright Tests
- Project Configurations & Config options for robust Framework design
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

### Section 2. Setup & Basics
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
- `test.only('title', async({page})) => {...}` here .only will force the runner to only run this test in the file

### Section 3. Playwright Basic Methods
- Selectors CSS and XPATH
- Rules to write CSS selectors
- JS doesn't follow a process to run lines
```
If IF is present
css -> tagname#id (or) #id

If class attribute is present
css -> tagname.class (or) .class

Write css based on any attribute
css -> [attribute='value']

Write css with traversing from Parent to Child
css -> parenttagname >> childtagname

If needs to write the locator based on text
text=''
```

### Section 4. Handling UI Components
- Selectors CSS and XPATH
- When action is performed inside () then the await must be inside with the location. 

### Section 5. Playwright Inspectors, Trace Viewers & Codegen tools
- Used for debugging
- --debug
- Explore can help inspect UI objects to generate selectors
- Record and Playback
    - `npx playwright codegen [website]`
- Reporting with Screenshot
    - Inside of config > Use
        - Add: screenshot : 'on', trace : 'on',
    - trace.playwright.dev

### Section 6. E2E Web Automation
- `await page.locator("h3:has-text(productName)")` another method to find elements

### Section 8. API Testing with Playwright and Build mix of Web & API Tests
- API will get the response, front will render the data and present
- End points
- Apps are driven by session cookies
- Use token for multiple test cases instead of login
- One test case will store the token


### Section 9. Session storage & Intercepting Network request/responses
- Method: storage state ==> JSON File
- Login, save JSON, inject JSON on all test
- New instance (context) pass the json
- Storage happens at the context level, not at the page level
- to Debug - package.json, under Debug, "Scripts" > "test" and pass the command
    - Debug npm script mode (Shift Ctrl + P)
    - when debugging increase timeout time
- Keep in mind each Endpoint and responses
- Intercept response instead of deleting all data
- Interception basically is using .route(). Url you want to intercept and continue to the url you want to redirect
- page.route('**/*.css', route => route.abort()); any url 
    - page.route('**/*.{css,jpg,png,jpeg}', route => route.abort());
- page.on('request', request => console.log(request.url()));
- page.on('response', request => console.log(response.url(), response.status()));

### Section 10. Perform Visual Testing with Playwright Algorithms
- File to File comparison - Test to compare 2 screenshots


### Section 11. Page Object Patterns & Data Driven Parameterization for Playwright Tests
- Test case should be wrapped in its own logic file
- Login should be go in its own JS File
- When using a JSON File to send test data: JSON -> String -> JS Object
    - Driving the data test from external files
- Parameterization w/ different data set
    - Make JSON as an array
    - For data set (multiple test data) encapsule inside for-loop
    - ${data.userType} is no differentiate the test data from the Json... ` this quote type is important
    - Fixture -> crate 

### Section 12. Project Configurations & Config options for robust Framework design
- Run multiple configurtion files
- Single file with Project array
- Have to specify the project to run

### Section 13. Test Retries , Serial & Parallel execution & Tagging Tests in Playwright
- Running in serial - Default
- For parallel - workers 5 by default.
- for tests inside one single file, pass the following parameter 
    - test.describe.configure({mode:'parallel}) -- inside the test file, at the top
    - serial mode, upon fail of a test, it will stop the rest of the test
- Tagging:
    - example test('@Web .... @API....
    - npx playwright test --grep="@Web"

### Section 14. HTML & Allure Reporting & CI/CD Jenkins Integration
- Install Allue Playwright >  npm i -D allure
- Run partial test using allure: npx playwright test --grep="@Web" --reporter=line,allure-playwright
- Generate Report: allure generate .\allure-results\ --clean
- Open the report: allure open .\allure-report\
- Issue related to "allure: The term 'allure' is not recognized as the name of a cmdlet
    - Solution: https://www.npmjs.com/package/allure-commandline
    - Command: npm install -g allure-commandline --save-dev
- Issue related to scripts is disabled on this system... 
    - Solution: Delete File C:\Users\Ivan\AppData\Roaming\npm\allure.ps1
- Start Jenkins: java -jar jenkins.war -httpPort=9090
    - New
    - Title, Freestyle
    - Description
    - This project is parameterized (add Name and choices)
    - Custom Path
    - Build: Windows batch --> npm run "%Script%"
    - Shell: npm run "$Script" (Shell)