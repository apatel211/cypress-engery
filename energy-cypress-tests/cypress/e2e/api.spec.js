describe('Api', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Create Usage Data - Success', () => {

        cy.login();
        cy.fixture('usage-post.json').then((data) => {
            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataValid).then((response) => {
                // Status code check
                expect(response.status, 'status code').to.equal(200);
                // Response structure check
                expect(response.body, 'response body').to.have.property('message', 'Energy usage saved successfully!');
            });
        });
    });

    it('Create Usage Data - Failure', () => {

        cy.login();
        cy.fixture('usage-post.json').then((data) => {
            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataInvalid).then((response) => {
                // Status code check
                expect(response.status, 'status code').to.equal(400);
                // Response structure check
                expect(response.body, 'response body').to.have.property('message', 'Invalid data format');
            });
        });
    });

    it('GET all usage records and assert', () => {

        cy.login();
        cy.fixture('usage-get.json').as('expectedUsage'); // load expected data
        cy.GETUsageData(Cypress.config().baseUrl).then((response) => {
            cy.get('@expectedUsage').then((usageData) => {
                expect(response.status).to.equal(200);
                expect(response.body.records, 'records array').to.be.an('array').that.is.not.empty;
                usageData.valid.records.forEach((expectedRecord) => {
                    const match = response.body.records.find((r) =>
                        r.nmi === expectedRecord.nmi &&
                        r.timestamp === expectedRecord.timestamp &&
                        Number(r.consumption) === Number(expectedRecord.consumption) &&
                        r.unit === expectedRecord.unit
                    );
                    expect(match, `Record not found: ${expectedRecord.nmi}`).to.exist;
                });
                cy.log('GET UsageData response: ' + JSON.stringify(response.body));
            });
        });
    });

    it('GET all usage records and assert invalid records do not exist', () => {

        cy.login();
        cy.fixture('usage-get.json').as('expectedUsage');
        cy.GETUsageData(Cypress.config().baseUrl).then((response) => {
            cy.get('@expectedUsage').then((usageData) => {
                expect(response.status).to.equal(200);
                usageData.invalid.records.forEach((invalidRecord) => {
                    const match = response.body.records.find((r) =>
                        r.nmi === invalidRecord.nmi &&
                        r.timestamp === invalidRecord.timestamp &&
                        Number(r.consumption) === Number(invalidRecord.consumption) &&
                        r.unit === invalidRecord.unit
                    );
                    expect(match, `Invalid record should not exist: ${invalidRecord.nmi}`).to.not.exist;
                });
                cy.log('GET UsageData response: ' + JSON.stringify(response.body));
            });
        });
    });


    it('Login API - Success', () => {

        cy.fixture('test-data.json').then((data) => {
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

        cy.fixture('test-data.json').then((data) => {
            cy.POSTLogin(Cypress.config().baseUrl, data.invalidCredentials)
                .then((response) => {
                    expect(response.status).to.equal(401);
                    expect(response.body).to.have.property('message', 'Invalid credentials');
                });
        });
    });

});

