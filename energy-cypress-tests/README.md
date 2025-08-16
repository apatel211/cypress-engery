# Energy App - Cypress Test Framework (mock/stub + POM)

This folder contains a Cypress test framework scaffold tailored to the provided assignment.

Features included:
- Page Object Model (cypress/support/pages)
- Fixtures for stubbing /api/nmi-data (cypress/fixtures/nmi-data.json)
- Custom Cypress commands for login and mocking (`cypress/support/commands.js`)
- Tests for Authentication, Dashboard, and Enter Energy Usage flows (cypress/e2e)
- Reporting support with mochawesome (script `cypress:run`)
- Code coverage plugin scaffold (@cypress/code-coverage) - requires app instrumentation
- package.json with devDependencies and scripts

How to run:
1. Install dependencies: `npm install`
2. Start the app locally (expected at http://localhost:3000)
3. Run tests: `npm run cypress:open` or `npm run cypress:run`

Notes about code coverage:
- To collect coverage you'll need the app instrumented (e.g., using `babel-plugin-istanbul` or equivalent).
- See @cypress/code-coverage docs for details. The support and cypress.config.js have the plugin hooks included.

Changes made:
- No changes were made to the application code. This folder contains only test code and fixtures.

What to add for CI:
- Install Cypress, run `npm run cypress:run`
- Collect mochawesome JSONs and merge them, then produce HTML reports
- Optionally collect coverage reports with nyc/lcov and upload to Coveralls or Codecov.

