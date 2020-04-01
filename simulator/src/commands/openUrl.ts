import Cypress from "cypress";

const openUrl = async (data, ws: WebSocket) => {
  cy.visit(data?.url);

  ws.send("...");
};

export default openUrl;
