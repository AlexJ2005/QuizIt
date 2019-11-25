describe("create a quiz", () => {
  beforeEach(() => {
    console.log("Test started");
  });
  afterEach(() => {
    console.log("Test ended");
  });
});

it("should create a new quiz", () => {
  cy.visit("http://localhost:3000/createQuiz");
  cy.get("[data-cy=name-form]").type("Alexanders");
  cy.get("[data-cy=add-question]").click();
  cy.wait(10000);
  cy.get("[data-cy=question]").type("Where do I live");
  cy.get("[data-cy=answer]").type("Sweden");
  cy.get("[data-cy=create-quiz]").click();
});
