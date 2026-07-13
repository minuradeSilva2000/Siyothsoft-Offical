const { defineConfig } = require("cypress");
const basicAuth = Buffer.from('fl01:123456').toString('base64');

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://devflexi.siyothsoft.com",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
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
