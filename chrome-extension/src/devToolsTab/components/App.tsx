import * as React from "react";

import "@projectstorm/react-diagrams/dist/style.min.css";
import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
} from "@projectstorm/react-diagrams";

import { Block } from "../../types";

const App: React.FC = () => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  const model = new DiagramModel();
  engine.setDiagramModel(model);

  React.useEffect(() => {
    chrome.devtools.panels.create(
      "Testy",
      "cypresscone16.png",
      "devToolsTab/index.html"
    );
    chrome.storage.local.get(["codeBlocks"], result => {
      let x = 0;
      (result.codeBlocks ?? []).forEach((block: Block) => {
        const node = new DefaultNodeModel(block.command, "rgb(192,255,0)");
        node.setPosition(x, 100);
        node.updateDimensions({ width: 100, height: 50 });
        node.addInPort("in");
        node.addOutPort("out");
        model.addNode(node);
        x += 200;
      });
    });
  }, []);

  return (
    <div id="App">
      <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
    </div>
  );
};

export default App;
