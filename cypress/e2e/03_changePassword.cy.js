/// <reference types="cypress" />

describe("Change Password - პაროლის შეცვლა", () => {
  let user;

  before(() => {
    cy.fixture("user").then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    cy.login(user.loginName, user.password);
    cy.goToChangePassword();
  });


  it("should navigate to Change Password page from sidebar", () => {
    cy.url().should("include", "account/password");
  });

  it("should display password change form fields", () => {
    cy.get("#PasswordFrm_current_password").should("be.visible");
    cy.get("#PasswordFrm_password").should("be.visible");
    cy.get("#PasswordFrm_confirm").should("be.visible");
  });

  it("should show error when passwords do not match", () => {
    cy.get("#PasswordFrm_current_password").type(user.password);
    cy.get("#PasswordFrm_password").type("NewPass@123");
    cy.get("#PasswordFrm_confirm").type("DifferentPass@456");
    cy.get("button[type='submit']").contains("Continue").click();
    cy.get(".alert-danger, .error").should("be.visible");
  });

  it("should show error when password is too short", () => {
    cy.get("#PasswordFrm_current_password").type(user.password);
    cy.get("#PasswordFrm_password").type("123");
    cy.get("#PasswordFrm_confirm").type("123");
    cy.get("button[type='submit']").contains("Continue").click();
    cy.get(".alert-danger, .error").should("be.visible");
  });

  it("should successfully change password and login with new password", () => {
    cy.get("#PasswordFrm_current_password").type(user.password);
    cy.get("#PasswordFrm_password").type(user.newPassword);
    cy.get("#PasswordFrm_confirm").type(user.newPassword);
    cy.get("button[type='submit']").contains("Continue").click();
    cy.url().should("include", "account/account");

    // პაროლის უკან დაბრუნება
    cy.visit("/index.php?rt=account/password");
    cy.get("#PasswordFrm_current_password").type(user.newPassword);
    cy.get("#PasswordFrm_password").type(user.password);
    cy.get("#PasswordFrm_confirm").type(user.password);
    cy.get("button[type='submit']").contains("Continue").click();
    cy.url().should("include", "account/account");
  });
});