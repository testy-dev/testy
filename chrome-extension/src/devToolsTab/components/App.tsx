import React, { useEffect, useState } from "react";

import { Block, Edge, UUID } from "@testy/shared/types";
import { Diagram } from "@testy/diagram";
import { v4 as uuid } from "uuid";
import debug from "debug";
import styled from "styled-components";

import { write } from "../../helpers/model";
import EditBlock from "./EditBlock";
import createPath from "../../helpers/createPath";
import useLocalStorage from "../../helpers/useLocalStorage";

const debugDiagram = debug("devtools:diagram");
debug.enable("*");

const App: React.FC = () => {
  // Register tab in dev tools
  useEffect(() => {
    chrome.devtools.panels.create(
      "Testy",
      "cypresscone16.png",
      "devToolsTab/index.html"
    );
  }, []);

  const storage = useLocalStorage();
  const [path, setPath] = useState<string[]>([]);
  const [hoverBlock, setHoverBlock] = useState<string | null>(null);

  // Update path on change incoming data
  // useEffect(() => {
  //   if (storage.active) {
  //     const newPath = createPath(storage.edges, path, storage.active);
  //     if (newPath !== path) {
  //       setPath(newPath);
  //     }
  //   }
  // }, [path, storage.active, storage.edges]);

  const handleSelectBlock = async (blockID: UUID | null) => {
    if (blockID) setPath(createPath(storage.edges, path, blockID));
    await write({ active: blockID });
  };

  const handleCreateBlock = async (
    inConn: UUID | null,
    outConn: UUID | null
  ) => {
    debugDiagram("create block, %s -> new block -> %s", inConn, outConn);

    const newBlock: Block = {
      id: uuid(),
      command: "click",
      selector: "",
    };
    const newEdges: Edge[] = [];
    if (inConn) newEdges.push([inConn, newBlock.id]);
    if (outConn) newEdges.push([newBlock.id, outConn]);

    await write({
      blocks: [...storage.blocks, newBlock],
      edges: [
        ...storage.edges.filter(([i, o]) => i !== inConn && o !== outConn),
        ...newEdges,
      ],
      active: newBlock.id,
    });
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
    await write({
      edges: storage.edges.filter(([i, o]) => !(i === from && o === to)),
    });
  };

  return (
    <Root>
      <Diagram
        blocks={storage.blocks}
        edges={storage.edges}
        selected={storage.active}
        path={path}
        hoverBlock={hoverBlock}
        setHoverBlock={setHoverBlock}
        onSelectBlock={handleSelectBlock}
        onCreateBlock={handleCreateBlock}
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
        {path.map(blockID => {
          const block = storage.blocks.find(b => b.id === blockID);
          if (!block) return null;
          return (
            <EditBlock
              key={blockID}
              active={blockID === storage.active}
              hover={hoverBlock === blockID}
              setHover={state =>
                state ? setHoverBlock(blockID) : setHoverBlock(null)
              }
              block={block}
              onSave={handleUpdateBlock}
            />
          );
        })}
      </Column>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;
const Column = styled.div`
  flex: 350px 0 0;
  padding: 5px;
  border-left: 1px solid #cccccc;
  background: #f3f3f3;
  color: #444444;
  line-height: 1.5;
  overflow-y: auto;
`;
const Header = styled.h1`
  margin: 0 0 5px;
`;

export default App;
