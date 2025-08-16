import { loginPage } from '../support/pages/login.page'

describe('Authentication', () => {

    beforeEach(() => {
        // Ensure no previous session
        cy.clearCookies();
        cy.clearLocalStorage();
        loginPage.visit();
    });

    it('happy path: logs in with valid credentials', () => {
        cy.fixture('testData.json').then((testdata) => {
            loginPage.username().type(testdata.validCredentials.username);
            loginPage.password().type(testdata.validCredentials.password);
            loginPage.submit().click();

            // assert redirect to home
            cy.url({ timeout: 30000 }).should('include', '/home');
            cy.get('h2.chakra-heading', { timeout: 10000 })
                .should('be.visible')
                .and('contain', 'Welcome to your assignment!');
        });
    });

    it('invalid credentials show error', () => {
        cy.fixture('testData.json').then((testdata) => {
            loginPage.username().type(testdata.invalidCredentials.username);
            loginPage.password().type(testdata.invalidCredentials.password);
            loginPage.submit().click();

            cy.contains('div', 'Something went wrong!').should('be.visible');
        });
    });

});
