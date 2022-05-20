// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries: 2, 
  workers: 2, 
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /*Maximum time expect() */
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'webkittest',
      use: {
        browserName : 'webkit',
        //viewport: {width:720, height:720},
        ...devices['iPhone 11'],
        headless : false,
        screenshot : 'only-on-failure',
        video : 'retain-on-failure',
           /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace : 'retain-on-failure',
      },
    },
    {
      name: 'firefoxtest',
      use: {
        browserName : 'firefox',
        headless : true,
        screenshot : 'only-on-failure',
        video : 'retain-on-failure',
        actionTimeout: 0,
        trace : 'retain-on-failure',
        ignoreHTTPSErrors: true, //Ignore ssl error
        permissions:['geolocation'], //Allow permission to browser popup
      },
    },

  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
