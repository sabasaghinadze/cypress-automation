/// <reference types="cypress" />

describe("Edit Account Details", () => {
  let user;

  before(() => {
    cy.fixture("user").then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    cy.login(user.loginName, user.password);
    cy.goToEditAccount();
  });

  it("should navigate to Edit Account Details page from sidebar", () => {
    cy.visit("/index.php?rt=account/account");
    cy.contains("a", "Edit account details").click({ force: true });
    cy.url().should("include", "account/edit");
  });

  it("should display pre-filled account details form", () => {
    cy.get("#AccountFrm_firstname").should("be.visible");
    cy.get("#AccountFrm_lastname").should("be.visible");
    cy.get("#AccountFrm_email").should("be.visible");
  });

  it("should update account details and verify changes are saved", () => {
    const updatedFirstName = "SabaUpdated";
    const updatedLastName = "SaginadzeUpdated";

    cy.get("#AccountFrm_firstname").clear().type(updatedFirstName);
    cy.get("#AccountFrm_lastname").clear().type(updatedLastName);
    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-success").should("be.visible");

    cy.goToEditAccount();
    cy.get("#AccountFrm_firstname").should("have.value", updatedFirstName);
    cy.get("#AccountFrm_lastname").should("have.value", updatedLastName);

    // მონაცემების უკან დაბრუნება
    cy.get("#AccountFrm_firstname").clear().type("saba");
    cy.get("#AccountFrm_lastname").clear().type("saginadze");
    cy.get("button[type='submit']").contains("Continue").click();
  });

  it("should show error when required fields are empty", () => {
    cy.get("#AccountFrm_firstname").clear();
    cy.get("#AccountFrm_lastname").clear();
    cy.get("button[type='submit']").contains("Continue").click();
    cy.get(".alert-danger, .error").should("be.visible");
  });
});