const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
    specPattern:"cypress/example/*.cy.js",
    specPattern:"cypress/integration/TestApi/*.js"
  },
});


