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
      TRELLO_KEY: process.env.TRELLO_KEY || 'cd8ce8f5f3ef878d11927d43cc325cae',
      TRELLO_TOKEN: process.env.TRELLO_TOKEN || 'ATTA3714dedd8931ba02ec988baf032354b7c6fe209c69c5c66e1ec96df9576039dc05C9E21D',
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