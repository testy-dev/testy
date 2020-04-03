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

it("test", function(done) {
  const ws = new WebSocket("ws://localhost:8082");
  const send = data => ws.send(JSON.stringify(data));

  ws.onopen = () => {
    // const monitoring = new Monitoring(ws, 1000);
    // monitoring.start();
    send({ message: "Hello from Cypress!" });

    setInterval(() => {
      const urlRequest = cy.url().then(url => {
        send({ url: url });
      });
      const screenRequest = cy.screenshot({
        afterScreenshot(element) {
          send({ message: "screenshot", element });
        },
      });
      send({ message: "updates", urlRequest, screenRequest });
    }, 4000);

    for (let i = 0; i < 3; i++) {
      const urlRequest = cy.url().then(url => {
        send({ url: url });
      });
      const screenRequest = cy.screenshot({
        afterScreenshot(element) {
          send({ message: "screenshot", element });
        },
      });
      send({ message: "updates", urlRequest, screenRequest });
      expect(true).equals(true);
    }

    // cy.visit("https://seznam.cz").screenshot();

    this.onmessage = async event => {
      try {
        const data = JSON.parse(event.data);
        // await runCommand(data, ws);
        if (data?.library === "cypress") {
          const response = cy[data.command].apply(data.args);
          send({ response });
          cy.screenshot({
            afterScreenshot(element) {
              send({ message: "screenshot", element });
            },
          });
          send({ message: "after_command", incoming_data: data });
        }
        // send({ message: "Command not run", incoming_data: data });
      } catch (e) {
        send({ status: "error" });
        send({ status: "error", message: e.message });
      }
    };

    this.onclose = () => {
      // monitoring.stop();
      console.log("Connection closed, exit 0");
      done();
    };
  };
});
