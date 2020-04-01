import openUrl from "./openUrl";

const runCommand = async (data: any, ws: WebSocket) => {
  switch (data?.command) {
    case "OPEN_URL":
      return await openUrl(data, ws);
    default:
      return "Command not found";
  }
};

export default runCommand;
