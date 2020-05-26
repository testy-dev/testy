type Block = {
  blockId: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED";
  msg?: string;
};

it("test", function () {
  const ws = new WebSocket("ws://localhost:8082");
  const send = data => ws.send(JSON.stringify(data));

  let commands = [];
  const blockResults: Block[] = [];

  ws.onopen = () => {
    send({ hello: "Hello from Cypress!" });

    ws.onmessage = event => {
      try {
        send("Data:");
        send(event.data);
        commands = JSON.parse(event.data).event.data.new.edges;
      } catch (e) {
        console.error("Cannot JSON parse message input", event, e);
      }
    };
  };

  cy.waitUntil(
    () => {
      if (ws.readyState !== 1) return; // Wait for opened connection

      if (commands.length) {
        commands.forEach(command => {
          send({ message: "Command to execute", command });
          try {
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
              case "type":
                cy.get(command.selector).type(command.parameter);
                break;
            }
            blockResults.push({ blockId: command.block_id, status: "SUCCESS" });
          } catch (e) {
            blockResults.push({
              blockId: command.block_id,
              msg: e.message,
              status: "FAILED",
            });
          }
        });
        send(JSON.stringify(blockResults));
      }
      return false;
    },
    {
      timeout: 1e12,
      interval: 100,
    }
  );
});
