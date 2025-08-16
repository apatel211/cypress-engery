
describe('api page', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });


    it('Create Usage Data - Success', () => {
        cy.login();
        cy.POSTUsageData(Cypress.config().baseUrl).then((response) => {
            // Status code check
            expect(response.status, 'status code').to.equal(200);
            // Response structure check
            expect(response.body, 'response body').to.have.property('message', 'Energy usage saved successfully!');
        });
    });

    it('GET: Fetch all usage records and assert', () => {
        cy.login();
        cy.fixture('usage-get.json').as('expectedUsage'); // load expected data

        cy.GETUsageData(Cypress.config().baseUrl).then((response) => {
            cy.get('@expectedUsage').then((usageData) => {
                // Assertions in test
                expect(response.status).to.equal(200);
                expect(response.body.records, 'records array').to.be.an('array').that.is.not.empty;
                expect(response.body.records, 'records include fixture data').to.deep.include.members(usageData.records);

                cy.log('GET UsageData response: ' + JSON.stringify(response.body));
            });
        });
    });


    it('Create Usage Data - Failure', () => {
        cy.login();
        cy.fixture('usage-post.json').then((data) => {
            // Create invalid request (missing required field)
            const invalidData = { ...data, nmi: '' };

            cy.request({
                method: "POST",
                url: `${Cypress.config().baseUrl}/api/usage`,
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: invalidData
            }).then((response) => {
                expect(response.status, 'status code').to.equal(400); // or your expected error code
                expect(response.body, 'error message')
                    .to.have.property('message', 'Invalid data format');
            });
        });
    });

    it('Login API - Success', () => {
        cy.fixture('testdata.json').then((data) => {
            cy.POSTLogin(Cypress.config().baseUrl, data.validCredentials)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal({
                        message: "Login successful",
                        token: "mock-jwt-token-12345"
                    });
                });
        });
    });

    it('Login API - Failure', () => {
        cy.fixture('testdata.json').then((data) => {
            cy.POSTLogin(Cypress.config().baseUrl, data.invalidCredentials)
                .then((response) => {
                    expect(response.status).to.equal(401);
                    expect(response.body).to.have.property('message', 'Invalid credentials');
                });
        });
    });

});
