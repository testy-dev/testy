import React from "react";

import { AllCommands } from "shared";
import { useLocalStore } from "mobx-react-lite";

const CommandsContext = React.createContext<{
  commands: AllCommands[];
} | null>(null);

export const CommandsProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    commands: [],
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
