const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'jps822',
  e2e: {
    setupNodeEvents(on, config) {
      // code coverage plugin
      require('@cypress/code-coverage/task')(on, config)
        include: ['/Users/ankitapatel/Desktop/assignments-main/flo-qa-assignment/app/api/**/*.js']

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
      coverage: {
          //instrument: '**/src/**/*.js' // Path to your application's JS code
          instrument: "../flo-qa-assignment/app/api/**/*.{js,ts}"

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
