// class Monitoring {
//   private ws: WebSocket;
//   private timeout_id: NodeJS.Timeout;
//   private timeout_ms: number;
//
//   constructor(ws: WebSocket, timeout: number) {
//     this.ws = ws;
//     this.timeout_ms = timeout;
//   }
//   public start() {
//     this.stop();
//     this.timeout_id = setInterval(() => {
//       this.check();
//       this.start();
//     }, this.timeout_ms);
//   }
//   public stop() {
//     clearTimeout(this.timeout_id);
//   }
//   private async check() {
//     this.ws.send(JSON.stringify({ message: "before_check_url" }));
//     cy.url().then(url => {
//       this.ws.send(JSON.stringify({ url: url }));
//     });
//   }
// }
//
// interface Message {
//   library: "cypress";
//   command: string;
//   args: any[];
// }

// it("check asope", () => {
//   cy.visit("https://asope.cz");
//   cy.get("#head-navi a").contains("Domů");
//   expect(true).to.equals(true);
// });

it("test2", function() {
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
        cy.log(data);
      } catch (e) {
        console.error("Cannot JSON parse message input", event, e);
      }
    };

    monitoringInterval = setInterval(() => {
      send({ message: "trigger_monitoring" });
      commands.push({
        library: "cypress",
        command: "url",
        args: [],
      });
      commands.push({
        library: "cypress",
        command: "screenshot",
        args: [],
      });
    }, 3000);

    // todo exit on close connection
    // ws.onclose = () => {
    //   clearInterval(monitoringInterval);
    // };
  };

  cy.waitUntil(
    () => {
      if (ws.readyState !== 1) return; // Wait for opened connection

      const command = commands.shift();
      if (command) {
        send({ message: "Command to execute", command });
        if (command?.library === "cypress") {
          const response = cy[command.command].apply(command.args);
          send({ message: "response", command, response });
          cy.screenshot({
            afterScreenshot(element) {
              send({ message: "screenshot", element });
            },
          });
          send({ message: "after_screenshot" });
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
