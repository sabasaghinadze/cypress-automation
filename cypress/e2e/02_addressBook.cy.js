/// <reference types="cypress" />

describe("Address Book - მისამართების მართვა", () => {
  let user;

  before(() => {
    cy.fixture("user").then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    cy.login(user.loginName, user.password);
  });

  it("should navigate to Address Book from sidebar", () => {
    cy.get(".side_account_list").find("a").contains("Manage Address Book").click();
    cy.url().should("include", "account/address");
    cy.get(".maintext").should("contain", "ADDRESS BOOK");
  });

  it("should add a new address successfully", () => {
    cy.goToAddressBook();

    cy.get("a.btn").contains("New Address").click();
    cy.url().should("include", "account/address/add");

    cy.get("#AddressFrm_firstname").clear().type(user.firstName);
    cy.get("#AddressFrm_lastname").clear().type(user.lastName);
    cy.get("#AddressFrm_address_1").clear().type("Rustaveli Avenue 1");
    cy.get("#AddressFrm_city").clear().type("Tbilisi");
    cy.get("#AddressFrm_postcode").clear().type("0100");
    cy.get("#AddressFrm_country_id").select("Georgia");

    // ქვეყნის არჩევის შემდეგ region/zone field-ის გამოჩენის მოლოდინი
    cy.wait(1000);

    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-success").should("be.visible");
    cy.url().should("include", "account/address");
  });

  it("should edit an existing address", () => {
    cy.goToAddressBook();

    // პირველი მისამართის რედაქტირება
    cy.get(".address_list").first().find("a").contains("Edit").click();

    cy.get("#AddressFrm_address_1").clear().type("Chavchavadze Avenue 5");
    cy.get("#AddressFrm_city").clear().type("Tbilisi");

    cy.get("button[type='submit']").contains("Continue").click();

    cy.get(".alert-success").should("be.visible");
  });

  it("should display existing addresses in address book", () => {
    cy.goToAddressBook();
    cy.get(".address_list").should("be.visible");
  });
});
