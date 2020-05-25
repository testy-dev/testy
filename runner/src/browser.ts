it("test", function () {
  const ws = new WebSocket("ws://localhost:8082");
  const send = data => ws.send(JSON.stringify(data));

  let commands = [];

  ws.onopen = () => {
    send({ hello: "Hello from Cypress!" });

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        console.log(event.data);
        commands = data.blocks;
      } catch (e) {
        console.error("Cannot JSON parse message input", event, e);
      }
    };
  };

  cy.waitUntil(
    () => {
      if (ws.readyState !== 1) return; // Wait for opened connection

      const command = commands.shift();
      if (command) {
        send({ message: "Command to execute", command });
        switch (command.command) {
          case "visit":
            cy.visit(command.parameter);
            break;
          case "click":
            cy.get(command.selector).click();
            break;
          case "check-contains-text":
            cy.get(command.selector).contains(command.parameter);
            break;
        }
        if (command?.library === "cypress") {
          const response = cy[command.command].apply(this, command.args);
          send({ message: "response", command, response });
        }
      }
      return false;
    },
    {
      timeout: 1e12,
      interval: 100,
    }
  );
});
