import * as React from "react";

import { Block, UUID } from "shared";
import { Diagram } from "diagram";
import debug from "debug";
import styled from "styled-components";

import { deleteBlock, write } from "../../helpers/model";
import EditBlock from "./EditBlock";
import useLocalStorage from "../../helpers/useLocalStorage";

const debugDiagram = debug("devtools:diagram");
debug.enable("*");

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

  const handleUpdateBlock = async (block: Block) => {
    debugDiagram("update block %O", block);

    await write({
      blocks: [...storage.blocks?.filter(b => b.id !== block.id), block],
    });
  };

  const handleDeleteBlock = async (blockID: UUID) => {
    debugDiagram("remove block %s", blockID);
    // await deleteBlock(blockID); // this will break diagram :(
  };

  const handleCreateEdge = async (from: UUID, to: UUID) => {
    debugDiagram("create edge from %s to %s", from, to);
  };

  const handleDeleteEdge = async (from: UUID, to: UUID) => {
    debugDiagram("remove edge from %s to %s", from, to);
  };

  const activeBlock =
    storage.active && storage.blocks.find(b => b.id === storage.active);
  return (
    <Root>
      <Diagram
        blocks={storage.blocks}
        edges={storage.edges}
        selected={storage.active}
        onSelectBlock={handleSelectBlock}
        onDeleteBlock={handleDeleteBlock}
        onCreateEdge={handleCreateEdge}
        onDeleteEdge={handleDeleteEdge}
      />
      <Column>
        <Header>Testy</Header>
        <div>Recording status: {storage.status ?? "off"}</div>
        <div>
          {storage.blocks?.length ?? 0} blocks, {storage.edges?.length ?? 0}{" "}
          edges
        </div>
        <div>Active block: {storage.active ?? "not set"}</div>
        {activeBlock && (
          <EditBlock block={activeBlock} onSave={handleUpdateBlock} />
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
