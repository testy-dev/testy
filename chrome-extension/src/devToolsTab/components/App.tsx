import * as React from "react";

import { RandomizeNodePositions, RelativeSize, Sigma } from "react-sigma";

const App: React.FC = () => {
  const [blocks, setBlocks] = React.useState<any>();

  React.useEffect(() => {
    chrome.devtools.panels.create(
      "Testy",
      "cypresscone16.png",
      "devToolsTab/index.html"
    );
  }, []);

  React.useEffect(() => {
    chrome.storage.local.get(["codeBlocks"], result => {
      const nodes = (result?.codeBlocks ?? []).map(block => ({
        id: block.id,
        label: block.value.command,
      }));
      setBlocks({
        nodes,
        edges: [
          {
            id: "e1",
            source: "5653544a-b112-44c3-ad16-ece73fcff9e8",
            target: "607b0555-f1d3-49f6-8c3d-3b0bb94777e3",
          },
          {
            id: "e2",
            source: "607b0555-f1d3-49f6-8c3d-3b0bb94777e3",
            target: "6800384a-e01c-4de9-b5b4-67d3dde05262",
          },
          {
            id: "e3",
            source: "6800384a-e01c-4de9-b5b4-67d3dde05262",
            target: "259d1e4b-b7cc-4afa-bcf4-ca248e817c33",
          },
        ],
      });
    });
  }, []);

  return (
    <div id="App">
      {blocks && (
        <Sigma
          graph={blocks}
          settings={{ drawEdges: true, clone: false }}
          onClickNode={e => console.log(e)}
        >
          <RelativeSize initialSize={15} />
          <RandomizeNodePositions />
        </Sigma>
      )}
    </div>
  );
};

export default App;
