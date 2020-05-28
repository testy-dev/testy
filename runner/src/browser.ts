import commands from "./steps.json";

Cypress.on(
  "uncaught:exception",
  (_err, _runnable) =>
    // returning false here prevents Cypress from
    // failing the test
    false
);

describe((commands as any).id.toString(), function () {
  JSON.parse((commands as any).edges).forEach(command => {
    it(command.id, () => {
      switch (command.command) {
        case "visit":
          cy.visit(command.parameter);
          break;
        case "click":
          const result = cy.get(command.selector).click();
          console.log("Result");
          console.log(result);
          break;
        case "check-contains-text":
          cy.get(command.selector).contains(command.parameter);
          break;
        case "type":
          cy.get(command.selector).type(command.parameter);
          break;
      }
    });
  });
});
