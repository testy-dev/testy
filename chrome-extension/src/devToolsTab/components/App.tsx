import * as React from "react";

import styled from "styled-components";

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

  const handleSelectBlock = async (blockID: UUID | null) => {
    await write({ active: blockID });
  };

  return (
    <Root>
      <Diagram
        blocks={storage.blocks}
        edges={storage.edges}
        onSelectBlock={handleSelectBlock}
      />
      <Column>
        <Header>Testy</Header>
        <div>Status: {storage.status ?? "off"}</div>
        <div>Continue after block: {storage.active ?? "not set"}</div>
      </Column>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  width: 250px;
  padding: 5px;
  border-left: 1px solid #cccccc;
  background: #f3f3f3;
  color: #444444;
`;
const Header = styled.h1`
  margin: 0 0 5px;
`;

export default App;
