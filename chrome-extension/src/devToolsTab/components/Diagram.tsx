import React, { useEffect, useMemo } from "react";

import "@projectstorm/react-diagrams/dist/style.min.css";
import {
  BaseEvent,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
  LinkModel,
} from "@projectstorm/react-diagrams";
import { forOwn } from "lodash";

import { Block, Edge, UUID } from "../../types";
import autoDistribute from "./autoDistribute";

interface IProps {
  blocks: Block[];
  edges: Edge[];
  onSelectBlock: (blockID: UUID | null) => void;
}

const getCommandColor = (command: Block["command"]): string => {
  switch (command) {
    case "click":
    case "dblclick":
    case "submit":
      return "#02a323";
    case "check-contains-text":
      return "#126dcd";
    case "type":
      return "#e7e630";
    case "visit":
      return "#ac056e";
    default:
      return "#5f5f5f";
  }
};

const Diagram: React.FC<IProps> = ({ blocks, edges, onSelectBlock }) => {
  const engine = useMemo(() => {
    const engine = new DiagramEngine();
    engine.installDefaultFactories();

    const model = new DiagramModel();
    engine.setDiagramModel(model);
    return engine;
  }, []);

  useEffect(() => {
    const model = engine.getDiagramModel();
    forOwn(model.getLinks(), link => model.removeLink(link));
    forOwn(model.getNodes(), node => model.removeNode(node));

    const nodes: any = {};
    blocks.forEach((block: Block) => {
      const node = new DefaultNodeModel(
        block.command === "check-contains-text"
          ? "contains text"
          : block.command,
        getCommandColor(block.command)
      );
      node.extras = { blockID: block.id };
      node.updateDimensions({ width: 100, height: 50 });
      node.addInPort("in");
      node.addOutPort("out");
      model.addNode(node);
      nodes[block.id] = node;
    });

    edges.forEach(([outBlockId, inBlockId]) => {
      const outPort = nodes[outBlockId].getOutPorts()[0];
      const inPort = nodes[inBlockId].getInPorts()[0];
      model.addLink(outPort.link(inPort));
    });
    autoDistribute(engine);
    forOwn(engine.getDiagramModel().getNodes(), node =>
      node.addListener({
        selectionChanged: e => {
          console.log(e);
          if (e.isSelected) {
            // @ts-ignore extras exists
            onSelectBlock(e.entity.extras.blockID);
          } else onSelectBlock(null);
        },
      })
    );
    engine.getDiagramModel().addListener({
      linksUpdated(event: BaseEvent & { link: LinkModel; isCreated: boolean }) {
        // @ts-ignore setColor is not documented
        event.link.setColor("#898989");
      },
    });
    engine.zoomToFit();
  }, [blocks, edges, engine, onSelectBlock]);

  return (
    <DiagramWidget
      className="srd-demo-canvas"
      diagramEngine={engine}
      maxNumberPointsPerLink={0}
      inverseZoom={true}
    />
  );
};

export default Diagram;
