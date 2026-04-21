const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationteststore.com",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {},
  },
});
