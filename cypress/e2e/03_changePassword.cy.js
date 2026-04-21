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
  });

  it("should navigate to Change Password page from sidebar", () => {
    cy.get(".side_account_list").find("a").contains("Change password").click();
    cy.url().should("include", "account/password");
    cy.get(".maintext").should("contain", "CHANGE PASSWORD");
  });

  it("should display password change form fields", () => {
    cy.goToChangePassword();
    cy.get("#PasswordFrm_password").should("be.visible");
    cy.get("#PasswordFrm_confirm").should("be.visible");
  });

  it("should show error when passwords do not match", () => {
    cy.goToChangePassword();

    cy.get("#PasswordFrm_password").type("NewPass@123");
    cy.get("#PasswordFrm_confirm").type("DifferentPass@456");
    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-danger, .error").should("be.visible");
  });

  it("should show error when password is too short", () => {
    cy.goToChangePassword();

    cy.get("#PasswordFrm_password").type("123");
    cy.get("#PasswordFrm_confirm").type("123");
    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-danger, .error").should("be.visible");
  });

  it("should successfully change password and login with new password", () => {
    cy.goToChangePassword();

    cy.get("#PasswordFrm_password").type(user.newPassword);
    cy.get("#PasswordFrm_confirm").type(user.newPassword);
    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-success").should("be.visible");

    // გამოვიდეთ და შევიდეთ ახალი პაროლით
    cy.visit("/index.php?rt=account/logout");
    cy.login(user.loginName, user.newPassword);
    cy.url().should("include", "account/account");

    // პაროლის უკან დაბრუნება
    cy.goToChangePassword();
    cy.get("#PasswordFrm_password").type(user.password);
    cy.get("#PasswordFrm_confirm").type(user.password);
    cy.get("button[type='submit']").contains("Continue").click();
    cy.get(".alert-success").should("be.visible");
  });
});
