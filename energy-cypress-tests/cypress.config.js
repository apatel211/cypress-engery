const {defineConfig} = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const path = require('path');

module.exports = defineConfig({
    projectId: 'jps822',
    e2e: {
        setupNodeEvents(on, config) {

            allureWriter(on, config);
            require('@cypress/code-coverage/task')(on, config)
            config.coverage = config.coverage || {};
            config.coverage.include = [
                path.join(__dirname, '../flo-qa-assignment/app/api/**/*.ts')
            ];
            return config
        },
        env: {
            codeCoverage: {
                exclude: [
                    'cypress/**/*.*',
                    '**/*.spec.js',
                    '**/*.cy.js'
                ]
            }
        },
        // Retry strategy
        retries: {
            runMode: 1, // CI: retry once to avoid duplicate coverage runs
            openMode: 0 // Local: no retries, fail immediately for debugging
        },
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/e2e/**/*.spec.js',
        supportFile: 'cypress/support/e2e.js',
        fixturesFolder: 'cypress/fixtures',
        screenshotOnRunFailure: true,
        video: false
    }
})
