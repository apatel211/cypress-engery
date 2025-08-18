import {loginPage} from '../support/pages/login.page'

describe('Authentication', () => {

    beforeEach(() => {
        // Ensure no previous session
        cy.clearCookies();
        cy.clearLocalStorage();
        loginPage.visit();
    });

    it('Happy path: logs in with valid credentials', () => {

        cy.fixture('test-data.json').then((data) => {
            loginPage.username().type(data.validCredentials.username);
            loginPage.password().type(data.validCredentials.password);
            loginPage.submit().click();
            // assert redirect to home
            cy.url({timeout: 30000}).should('include', '/home');
            cy.get('h2.chakra-heading', {timeout: 10000})
                .should('be.visible')
                .and('contain', 'Welcome to your assignment!');
        });
    });

    it('Invalid credentials show error', () => {

        cy.fixture('test-data.json').then((data) => {
            loginPage.username().type(data.invalidCredentials.username);
            loginPage.password().type(data.invalidCredentials.password);
            loginPage.submit().click();
            cy.contains('div', 'Something went wrong!').should('be.visible');
        });
    });

});
