describe('Mock Api ', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Create Usage Data - Success', () => {

        cy.fixture('usage-post.json').then((data) => {
            cy.mockPOSTUsage();
            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataValid).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('Energy usage saved successfully!');
            });
        });
    });

    it('Create Usage Data - Failure', () => {

        cy.fixture('usage-post.json').then((data) => {
            cy.mockPOSTUsageInvalid();
            cy.POSTUsageData(Cypress.config().baseUrl, data.usageDataInvalid).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Invalid data format');
            });
        });
    });

    it('GET all usage records - valid', () => {

        cy.fixture('usage-get.json').then((data) => {
            cy.mockUsageData(data.valid.records)
            cy.visit('/dashboard');
            cy.wait('@getUsage').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.message).to.equal('Able to verify json data');
            });
        });
    });


    it('GET all usage records - invalid', () => {

        cy.mockUsageDataNotFound();
        cy.visit('/dashboard');
        cy.wait('@getUsageNotFound').then((interception) => {
            expect(interception.response.statusCode).to.eq(404);
            expect(interception.response.body.message).to.equal('The requested usage file could not be located.');
        });
    });


    it('Login API - Success', () => {

        cy.fixture('test-data.json').then((data) => {
            cy.mockLogin(data.validCredentials.username, data.validCredentials.password);
            cy.login();
            cy.wait('@postLogin')
                .then((interception) => {
                    expect(interception.response.statusCode).to.eq(200);
                    expect(interception.response.body.message).to.eq('Login successfully');
                })
            cy.url().should('include', '/home');
        });
    });

    it('Login API - Failure', () => {

        cy.fixture('test-data.json').then((data) => {
            cy.mockLoginFailure(); // intercept with 401
            cy.login();
            cy.wait('@postLoginFail').then((interception) => {
                expect(interception.response.statusCode).to.eq(401);
                expect(interception.response.body.message).to.eq('Invalid credentials');
            });
            cy.url().should('include', '/login'); // should stay on login page
        });
    });

});
