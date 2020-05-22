import React, { useEffect } from "react";

import "@projectstorm/react-diagrams/dist/style.min.css";
import {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
} from "@projectstorm/react-diagrams";

import { Block, Edge, UUID } from "../../types";
import { write } from "../../helpers/model";
import autoDistribute from "./autoDistribute";

interface IProps {
  blocks: Block[];
  edges: Edge[];
  onSelectBlock: (blockID?: UUID) => void;
}

const Diagram: React.FC<IProps> = ({ blocks, edges }) => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  const model = new DiagramModel();
  engine.setDiagramModel(model);

  useEffect(() => {
    let x = 0;
    const nodes: any = {};
    blocks.forEach((block: Block) => {
      const node = new DefaultNodeModel(
        block.command,
        block.command === "check-contains-text" ? "#1d6fe8" : "#c0ff00"
      );
      node.setPosition(x, 100);
      node.addListener({
        selectionChanged: async (node: any) => {
          if (node?.isSelected) await write({ active: block.id });
        },
      });
      node.updateDimensions({ width: 100, height: 50 });
      node.addInPort("in");
      node.addOutPort("out");
      model.addNode(node);
      nodes[block.id] = node;
      x += 200;
    });

    edges.forEach(([outBlockId, inBlockId]) => {
      const outPort = nodes[outBlockId].getOutPorts()[0];
      const inPort = nodes[inBlockId].getInPorts()[0];
      const link = outPort.link(inPort);
      link.setColor("#898989");
      model.addLink(link);
    });
    autoDistribute(engine);
  }, [blocks, edges, model]);

  return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};

export default Diagram;
