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
  });

  it("should navigate to Edit Account Details page from sidebar", () => {
    cy.get(".side_account_list").find("a").contains("Edit account details").click();
    cy.url().should("include", "account/edit");
    cy.get(".maintext").should("contain", "MY ACCOUNT INFORMATION");
  });

  it("should display pre-filled account details form", () => {
    cy.goToEditAccount();
    cy.get("#AccountFrm_firstname").should("not.be.empty");
    cy.get("#AccountFrm_lastname").should("not.be.empty");
    cy.get("#AccountFrm_email").should("not.be.empty");
  });

  it("should update account details and verify changes are saved", () => {
    cy.goToEditAccount();

    const updatedFirstName = "MariamUpdated";
    const updatedLastName = "TestUpdated";

    cy.get("#AccountFrm_firstname").clear().type(updatedFirstName);
    cy.get("#AccountFrm_lastname").clear().type(updatedLastName);
    cy.get("#AccountFrm_phone").clear().type(user.phone);

    cy.get("button[type='submit']").contains("Continue").click();

    // წარმატების შეტყობინება
    cy.get(".alert-success").should("be.visible");

    // შემოვიდეთ Edit გვერდზე და შევამოწმოთ ცვლილებები
    cy.goToEditAccount();
    cy.get("#AccountFrm_firstname").should("have.value", updatedFirstName);
    cy.get("#AccountFrm_lastname").should("have.value", updatedLastName);

    // მონაცემების უკან დაბრუნება
    cy.get("#AccountFrm_firstname").clear().type(user.firstName);
    cy.get("#AccountFrm_lastname").clear().type(user.lastName);
    cy.get("button[type='submit']").contains("Continue").click();
  });

  it("should show error when required fields are empty", () => {
    cy.goToEditAccount();
    cy.get("#AccountFrm_firstname").clear();
    cy.get("#AccountFrm_lastname").clear();
    cy.get("button[type='submit']").contains("Continue").click();
    cy.get(".alert-danger, .error").should("be.visible");
  });
});
