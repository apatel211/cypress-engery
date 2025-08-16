export class LoginPage {
  visit() { cy.visit('/login') }
  username() { return cy.get('input[name="username"]') }
  password() { return cy.get('input[name="password"]') }
  submit() { return cy.get('[type="submit"]') }
}

export const loginPage = new LoginPage()
