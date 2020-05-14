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

  //2) setup the diagram model
  const model = new DiagramModel();

  // //3-A) create a default node
  // const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  // const port1 = node1.addOutPort("Out");
  // node1.setPosition(0, 100);
  //
  // //3-B) create another default node
  // const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  // const port2 = node2.addInPort("In");
  // node2.setPosition(400, 100);

  // link the ports
  // const link1 = port1.link(port2);
  // (link1 as DefaultLinkModel).addLabel("Hello World!");

  //4) add the models to the root graph
  // model.addAll(node1, node2, link1);

  //5) load model into engine
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
        const node = new DefaultNodeModel(
          block.value.command,
          "rgb(192,255,0)"
        );
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
