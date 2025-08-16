Cypress.Commands.add("login", (fixture='testData.json', type='validCredentials') => {
    cy.fixture(fixture).then((data) => {

        const credentials = data[type]; // get nested object
        if (!credentials || !credentials.username || !credentials.password) {
            throw new Error(`Invalid fixture data for ${type}`);
        }
        cy.visit('/login');
        // Type username
        cy.get('input[name="username"]').clear().type(credentials.username);

        // Re-query password input in case DOM updated
        cy.get('input[name="password"]').clear().type(credentials.password);

        // Re-query submit button in case DOM updated
        cy.get('button[type="submit"]').click();
    });
});


Cypress.Commands.add('POSTUsageData', (baseURL) => {
    // Load request data from fixture
    cy.fixture('usage-post.json').then((usageData) => {
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
});

Cypress.Commands.add('GETUsageData', (baseURL) => {
    return cy.fixture('usage-get.json').then(() => {
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
});

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

