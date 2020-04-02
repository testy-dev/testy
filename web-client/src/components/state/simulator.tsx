import { useLocalStore } from "mobx-react-lite";
import React from "react";

const SimulatorContext = React.createContext(null);

export const SimulatorProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    _ws: null as null | WebSocket,
    incomingMessages: [] as any[],
    get ws() {
      if (!this._ws) {
        this._ws = new WebSocket("ws://localhost:8081");
      }
      return this._ws;
    },
    startListening() {
      this.ws.onmessage = event => {
        this.incomingMessages.push(event.data);
      };
    },
    send(data: any) {
      // this.ws.
    },
  }));
  return (
    <SimulatorContext.Provider value={store}>
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = () => {
  const store = React.useContext(SimulatorContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
