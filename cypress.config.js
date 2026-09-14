const { defineConfig } = require("cypress");
const basicAuth = Buffer.from('fl01:123456').toString('base64');

module.exports = defineConfig({
  allowCypressEnv: false,

  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    baseUrl: "https://devflexi.siyothsoft.com",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    video: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process')
        }
        return launchOptions
      })
    },
  },
});
