import { defineConfig } from "cypress"

/* eslint-disable */
export default defineConfig({
  reporter: "mocha-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, mocha-junit-reporter",
    mochaJunitReporterReporterOptions: {
      mochaFile: "reports/TRELLO-[hash].xml",
    },
  },
  e2e: {
    specPattern: "features/**/*.feature",
    video: false,
    screenshotOnRunFailure: false,
    retries: {
      runMode: 0,
      openMode: 0
    },
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin
      const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
      await require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin(on, config)
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))
      return config
    }
  },
})
