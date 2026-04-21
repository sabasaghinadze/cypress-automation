// ***********************************************
// Custom Commands for Automation Test Store
// ***********************************************

/**
 * Custom login command - გამოიყენება ყველა ტესტში
 * @param {string} loginName - მომხმარებლის სახელი ან email
 * @param {string} password - პაროლი
 */
Cypress.Commands.add("login", (loginName, password) => {
  cy.visit("/index.php?rt=account/login");
  cy.get("#loginFrm_loginname").clear().type(loginName);
  cy.get("#loginFrm_password").clear().type(password);
  cy.get("button[type='submit']").contains("Login").click();
  cy.url().should("include", "account/account");
  cy.get(".maintext").should("contain", "MY ACCOUNT");
});

/**
 * Custom command - Account გვერდზე გადასვლა
 */
Cypress.Commands.add("goToAccountPage", () => {
  cy.visit("/index.php?rt=account/account");
});

/**
 * Custom command - Edit Account Details გვერდზე გადასვლა
 */
Cypress.Commands.add("goToEditAccount", () => {
  cy.visit("/index.php?rt=account/edit");
});

/**
 * Custom command - Change Password გვერდზე გადასვლა
 */
Cypress.Commands.add("goToChangePassword", () => {
  cy.visit("/index.php?rt=account/password");
});

/**
 * Custom command - Address Book გვერდზე გადასვლა
 */
Cypress.Commands.add("goToAddressBook", () => {
  cy.visit("/index.php?rt=account/address");
});
