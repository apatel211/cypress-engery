describe('mock api page', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Create Usage Data - Success', () => {

        cy.fixture('usage-post.json').then((data) => {
            cy.mockPOSTUsageData({message: 'Energy usage saved successfully!'});

            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataValid).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('Energy usage saved successfully!');
            });
        });
    });

    it('Create Usage Data - Success', () => {

        cy.fixture('usage-post.json').then((data) => {
            cy.mockPOSTUsageInvalid({message: 'Invalid data format'});

            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataInvalid).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Invalid data format');
            });
        });
    });

    it('GET all usage records - valid', () => {

        cy.fixture('usage-get.json').then((data) => {
            cy.mockGETUsageData(data.valid.records);

            cy.GETUsageData(Cypress.config().baseUrl).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.records, 'records array').to.be.an('array').that.is.not.empty;

                data.valid.records.forEach((expectedRecord) => {
                    const match = response.body.records.find((r) => r.nmi === expectedRecord.nmi && r.timestamp === expectedRecord.timestamp && Number(r.consumption) === Number(expectedRecord.consumption) && r.unit === expectedRecord.unit);
                    expect(match, `Record not found: ${expectedRecord.nmi}`).to.exist;
                });
            });
        });
    });

    it('GET all usage records - invalid records do not exist', () => {

        cy.fixture('usage-get.json').then((data) => {
            cy.mockGETUsageData(data.valid.records); // still returns valid data

            cy.GETUsageData(Cypress.config().baseUrl).then((response) => {
                data.invalid.records.forEach((invalidRecord) => {
                    const match = response.body.records.find((r) => r.nmi === invalidRecord.nmi && r.timestamp === invalidRecord.timestamp && Number(r.consumption) === Number(invalidRecord.consumption) && r.unit === invalidRecord.unit);
                    expect(match, `Invalid record should not exist: ${invalidRecord.nmi}`).to.not.exist;
                });
            });
        });
    });


    it('Login API - Success', () => {

        cy.fixture('test-data.json').then((data) => {
            cy.mockLogin(data.validCredentials.username, data.validCredentials.password);

            cy.POSTLogin(Cypress.config().baseUrl, data.validCredentials).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('token');
            });
        });
    });

    it('Login API - Failure', () => {

        cy.fixture('test-data.json').then((data) => {
            // Mock failed login
            cy.mockLoginFailure(data.invalidCredentials.username, data.invalidCredentials.password);

            // Call POST login with invalid credentials
            cy.POSTLogin(Cypress.config().baseUrl, data.invalidCredentials).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body).to.have.property('message', 'Invalid credentials');
            });
        });
    });

});
