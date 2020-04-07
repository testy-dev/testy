import { useLocalStore } from "mobx-react-lite";
import React from "react";

interface CommandValues {
  [key: string]: number | string | CommandValues;
}

const CommandContext = React.createContext<null | CommandValues>(null);

const CommandProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({}));
  return (
    <CommandContext.Provider value={store}>{children}</CommandContext.Provider>
  );
};

const UniversalCommand: React.FC = () => {
  return <CommandProvider>

  </CommandProvider>;
};

export default UniversalCommand;
