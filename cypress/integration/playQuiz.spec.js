describe("Play Quiz", () => {
  beforeEach(() => {
    cy.server();
  });
  it("should be able to play quiz", () => {
    cy.route("/?name=Albert").as("search");
    cy.route("/").as("getQuizzes");
    cy.visit("http://localhost:3000/quizDashboard");
    cy.wait("@getQuizzes");
    cy.get("[data-cy=quiz-card]").should("have.length.gte", 10);
    cy.get("[data-cy=search-field]").type("Albert");
    cy.get("[data-cy=search-button]").click();
    cy.wait("@search");
    cy.get("[data-cy=quiz-card]").should("have.length.gte", 1);
    cy.get("[data-cy=play-button]").click();
    cy.contains("Multiple").click();
    cy.get("[data-cy=choice-button]").should("have.length", 3);
    cy.contains("Albert Einstein").click();
    cy.get("[data-cy=choice-button]").should("have.length", 3);
    cy.contains("Tyskland").click();
    cy.get("[data-cy=quiz-card]").should("have.length.gte", 10);
    cy.get("h4").contains("du hade 2 av 2 rätt");
  });
});
