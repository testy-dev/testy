import React from "react";

import { observable } from "mobx";
import { useLocalStore } from "mobx-react-lite";

interface CommandParameters {
  [key: string]: number | string | CommandParameters;
}

interface Command {
  parent: string;
  parameters: CommandParameters;
}

const CommandsContext = React.createContext<{
  commands: Map<string, Command>;
} | null>(null);

export const CommandsProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    commands: observable.map(),
  }));
  return (
    <CommandsContext.Provider value={store}>
      {children}
    </CommandsContext.Provider>
  );
};

export const useCommands = () => {
  const store = React.useContext(CommandsContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useCommands must be used within a CommandsProvider.");
  }
  return store;
};
