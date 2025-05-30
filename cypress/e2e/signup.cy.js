describe("signup", () => {
  it("testa att signup", () => {
    cy.visit("http://localhost:5173/signup");
    const username = "testUser";
    const password = "test";
    const email = "test@gmail.com";

    cy.get('input[placeholder="Användarnamn"]').type(username);
    cy.get('input[placeholder="Användarnamn"]').should("not.have.value", "");

    cy.get('input[placeholder="E-post"]').type(email);
    cy.get('input[placeholder="E-post"]').should("not.have.value", "");

    cy.get('input[placeholder="Lösenord"]').type(password);
    cy.get('input[placeholder="Lösenord"]').should("not.have.value", "");

    cy.get('input[placeholder="Verifiera lösenord"]').type(password);
    cy.get('input[placeholder="Verifiera lösenord"]').should(
      "not.have.value",
      ""
    );

    cy.get("form").submit();

    cy.contains("Logga in på Twitter").should("exist");
  });
});
