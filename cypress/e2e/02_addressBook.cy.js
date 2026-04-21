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
    cy.goToAddressBook();
  });

  it("should navigate to Address Book from sidebar", () => {
    cy.visit("/index.php?rt=account/account");
    cy.contains("a", "Manage Address Book").click({ force: true });
    cy.url().should("include", "account/address");
  });

   it("should add a new address successfully", () => {
    cy.contains("New Address").click();
    
    cy.get("#AddressFrm_firstname", { timeout: 10000 })
      .should("not.be.disabled")
      .clear()
      .type(user.firstName);
    cy.get("#AddressFrm_lastname").clear().type(user.lastName);
    cy.get("#AddressFrm_address_1").clear().type("Rustaveli Avenue 1");
    cy.get("#AddressFrm_city").clear().type("Tbilisi");
    cy.get("#AddressFrm_postcode").clear().type("0100");
    cy.get("#AddressFrm_country_id").select("Georgia");
    cy.wait(1000);
    cy.get("button[type='submit']").last().click();
    cy.url().should("include", "account/notification");
  });

  it("should edit an existing address", () => {
    cy.get("a.btn-orange").first().click({ force: true });
    cy.get("#AddressFrm_address_1").clear().type("Chavchavadze Avenue 5");
    cy.get("#AddressFrm_city").clear().type("Tbilisi");
    cy.get("button[type='submit']").last().click();
    cy.url().should("include", "account/notification");
  });

  it("should display existing addresses in address book", () => {
    cy.contains("Address Book Entries").should("be.visible");
    cy.get("a.btn-orange").should("be.visible");
  });
});