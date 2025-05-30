describe("Login i två steg (username -> password)", () => {
  it("ska logga in med giltigt användarnamn och lösenord", () => {
    cy.visit("http://localhost:5173/");

    cy.get('input[placeholder="Username"]').type("testUser");
    cy.contains("Nästa").click();
    cy.get('input[placeholder="Password"]').should("be.visible").type("test");
    cy.get("form").submit();

    cy.contains("Profil").click();

    cy.contains("testUser").should("exist");
    cy.contains("0 tweets").should("exist");
    cy.get("img.profile-banner").should("be.visible");
    cy.get("img.profile-image").should("be.visible");
    cy.contains("User").should("exist");
    cy.contains("@testUser").should("exist");

    cy.contains("0 Following").should("exist");
    cy.contains("0 Followers").should("exist");
  });
});
