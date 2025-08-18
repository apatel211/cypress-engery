1️⃣ Advantages and disadvantages of the QA technologies used

Technologies used:
Cypress (E2E testing, API testing, stubbing/mocking)

Page Object Model (POM)

Mochawesome reporter

Fixtures & intercepts for API mocking

@cypress/code-coverage + nyc - To do


Advantages:

Cypress	Easy setup, fast local execution, supports API + UI in the same framework, auto-waiting eliminates most flakiness, built-in time travel/debugging.

POM	Centralizes locators and page actions, improving maintainability when the UI changes.

Mochawesome	Produces clean JSON/HTML reports for sharing with stakeholders and CI/CD integration.

Fixtures + intercept	Full control over API responses → deterministic tests, faster runs without relying on backend availability.

Code coverage	Direct visibility into what parts of the app are tested, encouraging better test completeness.

Disadvantages:

Cypress	Runs in the browser → limited support for multi-tab workflows, can be slower for very large suites compared to headless API-first testing frameworks.

POM	Requires discipline; if poorly maintained, page objects can become bloated and harder to refactor.

Mochawesome	Merging reports across parallel jobs needs extra tooling (mochawesome-merge).

Fixtures	Over-mocking risks missing real integration bugs if not balanced with live API testing.

Coverage	Requires code instrumentation, which can complicate builds if not configured early.


2️⃣ How tests are designed and structured

Test structure:
cypress/
e2e/
login.spec.js         # Authentication happy/negative paths
api.spec.js           # API data checks
enter-usage.spec.js   # Multi-step form entry
fixtures/
.json         # Mock API data for stubbing
support/
commands.js           # Custom Cypress commands for login/mocking
e2e.js                # Support entry point
pages/                # Page Objects for each page
login.page.js
enterUsage.page.js
Cypress.config.js    # Cypress configuration
package.json          # Dependencies and scripts

Design principles:

Separation of concerns
Page objects handle locators.
Specs focus on what to test, not how to locate elements.

Test case coverage:
Positive paths (happy flow)
Negative/error handling (invalid login)
API data verification ( GET/POST mock responses) validations

Reusable commands:
login() , Get() and Post() prevent duplicate code.

3️⃣ Design patterns, coding conventions, and documentation practices

Page Object Model (POM) :
Each page in the app has a class that encapsulates locators & actions, making UI changes easier to handle.

Command pattern (Cypress custom commands):
For login and API mocking, reusable commands are defined in commands.js.

Naming conventions:
Test files: <feature>.spec.js
Page object classes: <Feature>Page with an exported instance (e.g., loginPage).
Data attributes in selectors (data-cy=...) for stable element targeting. ( Not used in this project, but recommended for future projects)

Documentation:
README.md with run instructions and notes on dependencies.
Inline comments in tests and commands where steps are not self-explanatory.

4️⃣ What I would do better next time

Stronger API negative coverage:
Add tests for 4xx/5xx API responses and assert error handling in the UI.

Accessibility checks:
Integrate Cypress Axe to catch WCAG violations early.

Visual regression:
Add Percy or Cypress-image-snapshot to detect unintended UI changes.

Parallel + Cross-Browser:
Run multiple browsers on multiple machines (e.g., Chrome 2 + Firefox 2 → 4 jobs).Ensures fast feedback and browser coverage.

Environment-driven config:
Parameterize baseUrl and credentials for different environments (dev/staging/prod) instead of hardcoding in commands.

5️⃣ Areas for improvement & future approach

Maintainability:
As the suite grows, I’d implement a page-component object pattern for complex pages to break them into smaller logical units.

Coverage depth:
Add backend contract tests or schema validation to ensure API responses match expectations.

Data setup/teardown:
Instead of relying purely on fixtures, use a test API endpoint or DB seeding to set up realistic data before tests.

6️⃣ Alternative ways I could have done the project

I could have written the test cases under codebase , would be more easy for me to maintain and run tests in the same environment as the application, but it would have made the project less modular and harder to share with others.
Which would have been a drawback for collaboration and CI/CD integration , in addition, it would have limited the ability to use Cypress's powerful features like fixtures and intercepts effectively.
But it would have allowed for more direct interaction with the application code, potentially leading to faster test execution and easier debugging.
However, it would have sacrificed the modularity and separation of concerns that Cypress provides, making it harder to maintain as the application grows.

Other add on :
We can do data driven approach with dynamic request and response validation. 

In terms of approaches and alternatives :Other tools/frameworks:
Playwright: Fast, multi-browser support; slightly steeper learning curve.
TestCafe: Simple setup, isolated execution; smaller community.
API-first (Postman/Newman): Fast, UI-independent; no UI coverage.
BDD (Cucumber + Cypress): Improves collaboration; adds extra tooling.

Scripting languages:
JavaScript (Node.js) is standard for Cypress, but Python (with Selenium) or Java (with RestAssured) could be alternatives for different team skillsets.