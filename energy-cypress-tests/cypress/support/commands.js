Cypress.Commands.add("login", (fixture = 'test-data.json', type = 'validCredentials') => {
    cy.fixture(fixture).then((data) => {

        cy.visit('/login');
        // Type username
        cy.get('input[name="username"]').clear().type(data.validCredentials.username);
        // Re-query password input in case DOM updated
        cy.get('input[name="password"]').clear().type(data.validCredentials.password);
        // Re-query submit button in case DOM updated
        cy.get('button[type="submit"]').click();
    });
});

//post Usage API
Cypress.Commands.add('POSTUsageData', (baseURL, usageData) => {
    cy.request({
        method: "POST",
        url: `${baseURL}/api/usage`,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: usageData
    });
});

// GET Usage API
Cypress.Commands.add('GETUsageData', (baseURL) => {
    // Make GET request to fetch usage data
    return cy.request({
        method: 'GET',
        url: `${baseURL}/api/usage`,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
});

// POST Login API
Cypress.Commands.add('POSTLogin', (baseURL, credentials) => {
    cy.request({
        method: "POST",
        url: `${baseURL}/api/auth`,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: credentials
    });
})


// Mock login API
Cypress.Commands.add('mockLogin', (username, password) => {
    cy.intercept('POST', '**/api/auth', {
        statusCode: 200,
        body: {
            message: 'Login successfully',
            token: 'fake-jwt-token-12345',
        },
    }).as('postLogin');

});

Cypress.Commands.add('mockLoginFailure', () => {
    cy.intercept('POST', '**/api/auth', {
        statusCode: 401,
        body: {message: 'Invalid credentials'},
    }).as('postLoginFail');
});

// Mock POST Usage
Cypress.Commands.add('mockPOSTUsage', (validData = {}) => {
    cy.fixture('usage-post.json').then(() => {
        cy.intercept('POST', '**/api/usage', {
            statusCode: 200,
            body: {
                record: validData,
                message: 'Energy usage saved successfully!'
            },
        }).as('postUsage');
    })
});

Cypress.Commands.add('mockPOSTUsageInvalid', (invalidData = {}) => {
    cy.fixture('usage-post.json').then(() => {
        cy.intercept('POST', '**/api/usage', {
            statusCode: 400,
            body: {
                record: invalidData,
                message: 'Invalid data format'
            },
        }).as('postUsageInvalid');
    })
});

// Mock GET Usage
Cypress.Commands.add('mockUsageData', (validRecords = []) => {
    cy.fixture('usage-get.json').then((data) => {
        cy.intercept('GET', '/api/usage', {
            statusCode: 200,
            body: {records: validRecords, message: 'Able to verify json data'},
        }).as('getUsage');
    });
});

Cypress.Commands.add('mockUsageDataNotFound', () => {
    cy.intercept('GET', '/api/usage', {
        statusCode: 404,
        body: {
            message: 'The requested usage file could not be located.'
        }
    }).as('getUsageNotFound');
});
