import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    baseUrl: 'https://api.trello.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/index.ts',
    env: {
      TRELLO_KEY: process.env.TRELLO_KEY,
      TRELLO_TOKEN: process.env.TRELLO_TOKEN,
    },
    async setupNodeEvents(on, config) {
      // required for @badeball preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Use esbuild bundler with the cucumber preprocessor plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);

      return config;
    },
  },
});
