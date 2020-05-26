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
    ws.onmessage = event => {
      try {
        commands = JSON.parse(JSON.parse(event.data).event.data.new.edges);
        console.log("commands");
        console.log(commands);
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
          try {
            switch (command.command) {
              case "visit":
                cy.visit(command.parameter, {
                  onLoad: () => {
                    command.status = "SUCCESS";
                    blockResults.push(command);
                  },
                });
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
          } catch (e) {
            blockResults.push({
              blockId: command.id,
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
