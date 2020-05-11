import * as React from "react";

import {
  EdgeShapes,
  RandomizeNodePositions,
  RelativeSize,
  Sigma,
} from "react-sigma";

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
      const edges = [];

      // For now, only connect nodes one by one
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
          id: `e${i}`,
          source: nodes[i].id,
          target: nodes[i + 1].id,
        });
      }
      setBlocks({ nodes, edges });
    });
  }, []);

  return (
    <div id="App">
      {blocks && (
        <Sigma
          style={{ height: "100vh" }}
          graph={blocks}
          settings={{ drawEdges: true, clone: false }}
          onClickNode={console.log}
        >
          <RelativeSize initialSize={15} />
          <RandomizeNodePositions />
          <EdgeShapes default="arrow" />
        </Sigma>
      )}
    </div>
  );
};

export default App;
