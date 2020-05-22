import * as React from "react";

import { UUID } from "../../types";
import { write } from "../../helpers/model";
import Diagram from "./Diagram";
import useLocalStorage from "./useLocalStorage";

const App: React.FC = () => {
  // Register tab in dev tools
  React.useEffect(() => {
    chrome.devtools.panels.create(
      "Testy",
      "cypresscone16.png",
      "devToolsTab/index.html"
    );
  }, []);

  const storage = useLocalStorage();

  const handleSelectBlock = async (blockID?: UUID) => {
    await write({ active: blockID });
  };

  return (
    <div id="App">
      <Diagram
        blocks={storage.blocks}
        edges={storage.edges}
        onSelectBlock={handleSelectBlock}
      />
    </div>
  );
};

export default App;
