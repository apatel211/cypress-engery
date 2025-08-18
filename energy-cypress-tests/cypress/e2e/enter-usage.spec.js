import {enterUsagePage} from '../support/pages/enterUsage.page'
import {getRandomDropdownValue, getRandomNmiSuffix, getRandomUsage} from '../support/utils/dataGenerator';

describe('Enter Energy Usage', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        enterUsagePage.visit();
    })

    it('Fills the multi-step form and saves a new record', () => {

        const randomPrefix = getRandomDropdownValue();
        enterUsagePage.nmiPrefix().select(randomPrefix).should('have.value', randomPrefix);
        enterUsagePage.nmiSuffix().type(getRandomNmiSuffix())
        enterUsagePage.submit().click()
        enterUsagePage.usageInput().type(getRandomUsage())
        enterUsagePage.save().filter(':visible').should('be.enabled').click();
        cy.url().should('include', '/dashboard')
    })

    it('Invalid data show error', () => {

        enterUsagePage.nmiPrefix().select('NEM')
        enterUsagePage.nmiSuffix().type('12345')
        enterUsagePage.submit().click()
        cy.contains('div', 'Invalid form data: invalid NMI').should('be.visible');
    })
})
