import * as React from "react";

import { map } from "lodash";
import styled from "styled-components";

import { Commands, UUID } from "../../types";
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
        <div>Recording status: {storage.status ?? "off"}</div>
        <div>
          {storage.blocks?.length ?? 0} blocks, {storage.edges?.length ?? 0}{" "}
          edges
        </div>
        <div>Active block: {storage.active ?? "not set"}</div>
        {storage.active && (
          <>
            <div>
              Command:{" "}
              <select
                value={
                  storage.blocks?.find(b => b.id === storage.active)?.command
                }
              >
                {map(Commands, (value, key) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Selector:{" "}
              <input
                type="text"
                value={
                  storage.blocks?.find(b => b.id === storage.active)
                    ?.selector ?? ""
                }
              />
            </div>
            <div>
              Parameter:{" "}
              <input
                type="text"
                value={
                  storage.blocks?.find(b => b.id === storage.active)
                    ?.parameter ?? ""
                }
              />
            </div>
          </>
        )}
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
  line-height: 1.5;
`;
const Header = styled.h1`
  margin: 0 0 5px;
`;

export default App;
