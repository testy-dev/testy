import WebSocket, { Server } from "ws";

const publicWss = new Server({ port: 8081 });
const privateWss = new Server({ port: 8082 });

let publicWs: WebSocket | null = null;
let privateWs: WebSocket | null = null;

privateWss.on("connection", ws => {
  console.log("Opened private connection");
  if (!privateWs) privateWs = ws;

  ws.on("message", (_, data) => {
    if (publicWs) {
      console.log("Forward private -> public", data);
      publicWs.send(data);
    } else {
      console.log("Cannot forward private -> public", data);
      ws.send({ connection_status: "INCOMPLETE" });
    }
  });
});

publicWss.on("connection", ws => {
  console.log("Opened public connection");
  if (!publicWs) publicWs = ws;

  ws.on("message", (_, data) => {
    if (privateWs) {
      console.log("Forward public -> private", data);
      privateWs.send(data);
    } else {
      console.log("Cannot forward public -> private", data);
      ws.send({ connection_status: "INCOMPLETE" });
    }
  });
});

const exit = () => process.exit(0);
publicWss.on("close", exit);
privateWss.on("close", exit);
