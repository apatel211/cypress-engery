export class EnterUsagePage {
  visit() { cy.visit('/enter-usage') }
    nmiPrefix() { return cy.get('select.chakra-select.css-161pkch') }
  nmiSuffix() { return cy.get('input[name="nmiSuffix"]') }
    submit() { return cy.get('[type="submit"]') }
  usageInput() { return cy.get('input[name="consumption"]') }
   save() { return cy.get('button.chakra-button.css-j6lgx') }
}

export const enterUsagePage = new EnterUsagePage()
