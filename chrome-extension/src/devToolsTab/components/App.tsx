import * as React from "react";

import "@projectstorm/react-diagrams/dist/style.min.css";
import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
} from "@projectstorm/react-diagrams";

import { Block } from "../../types";
import { write } from "../../helpers/model";

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
    chrome.storage.local.get(["blocks", "edges"], result => {
      let x = 0;
      const blocks: any = {};
      (result.blocks ?? []).forEach((block: Block) => {
        blocks[block.id] = new DefaultNodeModel(
          block.command,
          "rgb(192,255,0)"
        );
        blocks[block.id].setPosition(x, 100);
        blocks[block.id].addListener({
          selectionChanged: async (node: any) => {
            if (node?.isSelected) await write({ active: block.id });
          },
        });
        blocks[block.id].updateDimensions({ width: 100, height: 50 });
        blocks[block.id].addInPort("in");
        blocks[block.id].addOutPort("out");
        model.addNode(blocks[block.id]);
        x += 200;
      });

      (result.edges ?? []).forEach(
        ([outBlockId, inBlockId]: [string, string]) => {
          model.addLink(
            blocks[outBlockId]
              .getOutPorts()[0]
              .link(blocks[inBlockId].getInPorts()[0])
          );
        }
      );
    });
  }, []);

  return (
    <div id="App">
      <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
    </div>
  );
};

export default App;
