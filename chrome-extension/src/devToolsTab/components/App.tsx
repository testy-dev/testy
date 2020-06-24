import React, { useEffect, useState } from "react";

import * as firebase from "firebase/app";
import { Block, Edge, UUID } from "@testy/shared/types";
import { Box, Button } from "grommet";
import { Diagram } from "@testy/diagram";
import { isEqual } from "lodash";
import { v4 as uuid } from "uuid";
import debug from "debug";
import styled from "styled-components";

import { JSONparse } from "@testy/shared";
import { createEdge, deleteBlock, write } from "../../helpers/model";
import { firebaseConfig } from "../../config";
import { useFirebaseAuthState } from "../../components/hooks";
import EditBlock from "./EditBlock";
import ToggleButton from "../../components/ToggleButton";
import callGraphql from "../../helpers/callGraphql";
import createPath from "../../helpers/createPath";
import useLocalStorage from "../../helpers/useLocalStorage";

function getStraightPath(edges: Block[]): UUID[][] {
  const path: UUID[][] = [];
  for (let i = 1; i < edges.length; i++) {
    path.push([edges[i - 1].id, edges[i].id]);
  }

  return path;
}

const debugDiagram = debug("devtools:diagram");
debug.enable("*");

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  // Register tab in dev tools
  useEffect(() => {
    chrome.devtools.panels.create(
      "Testy",
      "cypresscone16.png",
      "devToolsTab/index.html"
    );
  }, []);

  const [viewType, setViewType] = useState<"draft" | "runs">("draft");
  const [pastRuns, setPastRuns] = useState<any>();
  const [pastRunBlocks, setPastBlocks] = useState<any>();
  const [pastRunEdges, setPastEdges] = useState<any>();
  const storage = useLocalStorage();
  const [path, setPath] = useState<string[]>([]);
  const [hoverBlock, setHoverBlock] = useState<string | null>(null);
  const [screen, setScreen] = useState<string | null>(null);
  const authState = useFirebaseAuthState();

  // Update path on change incoming data
  useEffect(() => {
    if (storage.activeBlock) {
      const newPath = createPath(storage.edges, path, storage.activeBlock);
      if (!isEqual(newPath, path)) {
        setPath(newPath);
      }
    }
    console.log("Storage is:");
    console.log(storage);
  }, [path, storage]);

  const handleSelectBlock = async (blockID: UUID | null) => {
    if (blockID) {
      setPath(createPath(storage.edges, path, blockID));

      const pathId = (pastRuns?.project_by_pk?.run ?? []).find((run: any) =>
        (run?.paths ?? []).find((path: any) =>
          (path?.edges ?? []).find((edge: any) => edge?.id === blockID)
        )
      );
      setScreen(
        `https://storage.googleapis.com/testyx.appspot.com/paths/${
          pathId?.paths[0]?.id ?? ""
        }/${blockID}.jpg`
      );
    }
    await write({ activeBlock: blockID });
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
      activeBlock: newBlock.id,
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
    await deleteBlock(blockID); // this will break diagram :(
  };

  const handleCreateEdge = async (from: UUID, to: UUID) => {
    debugDiagram("create edge from %s to %s", from, to);
    await createEdge(from, to);
  };

  const handleDeleteEdge = async (from: UUID, to: UUID) => {
    debugDiagram("remove edge from %s to %s", from, to);
    await write({
      edges: storage.edges.filter(([i, o]) => !(i === from && o === to)),
    });
  };

  const handleSwitch = async () => {
    if (viewType === "draft") {
      setViewType("runs");
      if (!pastRuns) {
        chrome.storage.local.get("activeProject", async ({ activeProject }) => {
          const runs = await callGraphql(
            `
              query($projectId: Int!) {
                project_by_pk(id: $projectId) {
                  name
                  run {
                    id
                    paths {
                      id
                      edges
                    }
                  }
                }
              }
            `,
            { projectId: activeProject }
          );

          setPastRuns(runs.data);
          console.log(runs.data);
        });
      }
    } else {
      setViewType("draft");
      setScreen(null);
      setPastEdges(undefined);
      setPastBlocks(undefined);
    }
  };

  const handleSelectRun = (runId: number) => {
    console.log(runId);
    const run = (pastRuns?.project_by_pk?.run ?? []).find(
      (run: any) => run.id === runId
    );
    const pastBlocks = JSONparse(run.paths?.[0]?.edges);
    setPastBlocks(pastBlocks);
    setPastEdges(getStraightPath(pastBlocks));
  };

  return (
    <Root>
      <Diagram
        blocks={pastRunBlocks ?? storage.blocks}
        edges={pastRunEdges ?? storage.edges}
        selected={storage.activeBlock}
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
        <Box direction="row" gap="small" align="center">
          <Header>Testy</Header>
          <ToggleButton
            recStatus={storage.status}
            handleToggle={action =>
              chrome.runtime.sendMessage({ type: action })
            }
            isValidTab={true}
          />
          <div>
            {storage.blocks?.length ?? 0} blocks, {storage.edges?.length ?? 0}{" "}
            edges {authState}
          </div>
        </Box>
        <Box direction="row" gap="small" align="center">
          <Button
            label={`Switch to ${viewType === "draft" ? "runs" : "draft"}`}
            onClick={handleSwitch}
          />
        </Box>
        {viewType === "draft"
          ? path.map(blockID => {
              const block = storage.blocks.find(b => b.id === blockID);
              if (!block) return null;
              return (
                <>
                  {storage.edges.filter(([, w]) => w === blockID).length > 1 ? (
                    <MoreIncoming />
                  ) : null}
                  <EditBlock
                    key={blockID}
                    active={blockID === storage.activeBlock}
                    hover={hoverBlock === blockID}
                    setHover={state =>
                      state ? setHoverBlock(blockID) : setHoverBlock(null)
                    }
                    block={block}
                    onSave={handleUpdateBlock}
                  />
                  {storage.edges.filter(([v]) => v === blockID).length > 1 ? (
                    <MoreOutgoing />
                  ) : null}
                </>
              );
            })
          : !!pastRuns &&
            (pastRuns?.project_by_pk?.run ?? []).map((run: any) => (
              <div key={run.id} onClick={() => handleSelectRun(run.id)}>
                id #{run.id} - no. of paths: {run.paths.length}
              </div>
            ))}
        <img
          src={screen ?? ""}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Column>
    </Root>
  );
};

const MoreIncoming = () => <div>Incoming connections</div>;
const MoreOutgoing = () => <div>Outgoing connections</div>;

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
  margin: 0;
`;

export default App;
