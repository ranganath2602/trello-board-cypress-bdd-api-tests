import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
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
      // Required for Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild bundler with Node crypto fix
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          platform: 'node',
          target: 'node18',
          define: {
            crypto: 'require("crypto")',
          },
          external: ['esbuild'],
        })
      );

      return config;
    },
  },
});
