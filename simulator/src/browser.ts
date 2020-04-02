class Monitoring {
  private ws: WebSocket;
  private timeout_id: NodeJS.Timeout;
  private timeout_ms: number;

  constructor(ws: WebSocket, timeout: number) {
    this.ws = ws;
    this.timeout_ms = timeout;
  }
  public start() {
    this.stop();
    this.timeout_id = setTimeout(() => {
      this.check();
      this.start();
    }, this.timeout_ms);
  }
  public stop() {
    clearTimeout(this.timeout_id);
  }
  private async check() {
    cy.url().then(url => {
      this.ws.send(JSON.stringify({ url: url }));
    });
  }
}

interface Message {
  library: "cypress";
  command: string;
  args: any[];
}

it("test", done => {
  const ws = new WebSocket("ws://localhost:8082");

  ws.onopen = function ProcessConnection() {
    const monitoring = new Monitoring(ws, 1000);
    monitoring.start();

    cy.visit("https://seznam.cz").screenshot();

    this.onmessage = async event => {
      const data = event.data;
      cy.log("incoming message", data);
      // await runCommand(data, ws);
      if (data?.library === "cypress") {
        cy[data.command].apply(data.args);
      }
    };

    this.onclose = () => {
      monitoring.stop();
      console.log("Connection closed, exit 0");
      done();
    };
  };
});
