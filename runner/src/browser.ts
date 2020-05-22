it("test", function () {
  const ws = new WebSocket("ws://localhost:8082");
  const send = data => ws.send(JSON.stringify(data));

  const commands = [];
  let monitoringInterval;

  ws.onopen = () => {
    send({ hello: "Hello from Cypress!" });

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        commands.push(data);
      } catch (e) {
        console.error("Cannot JSON parse message input", event, e);
      }
    };

    // todo exit on close connection
    ws.onclose = () => {
      clearInterval(monitoringInterval);
    };
  };

  cy.waitUntil(
    () => {
      if (ws.readyState !== 1) return; // Wait for opened connection

      const command = commands.shift();
      if (command) {
        send({ message: "Command to execute", command });
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
