Cypress.Commands.add("login", (loginName, password) => {
  cy.session([loginName, password], () => {
    cy.visit("/index.php?rt=account/login");
    cy.get("#loginFrm_loginname", { timeout: 10000 })
      .should("be.visible")
      .should("not.be.disabled")
      .type(loginName);
    cy.get("#loginFrm_password").type(password);
    cy.get("#loginFrm button[type='submit']").click();
    cy.url().should("include", "account/account");
  });
});

Cypress.Commands.add("goToAccountPage", () => {
  cy.visit("/index.php?rt=account/account");
});

Cypress.Commands.add("goToEditAccount", () => {
  cy.visit("/index.php?rt=account/edit");
});

Cypress.Commands.add("goToChangePassword", () => {
  cy.visit("/index.php?rt=account/password");
});

Cypress.Commands.add("goToAddressBook", () => {
  cy.visit("/index.php?rt=account/address");
});