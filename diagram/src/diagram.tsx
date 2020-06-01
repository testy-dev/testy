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

import { Block, Commands, Edge, UUID } from "shared";
import autoDistribute from "./autoDistribute";

interface IProps {
  blocks: Block[];
  edges: Edge[];
  selected: UUID | null;
  onSelectBlock: (blockID: UUID | null) => void;
  onDeleteBlock?: (blockID: UUID) => void;
  onCreateEdge?: (from: UUID, to: UUID) => void;
  onDeleteEdge?: (from: UUID, to: UUID) => void;
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

interface Node extends DefaultNodeModel {
  extras: {
    blockID: UUID;
  };
}

const Diagram: React.FC<IProps> = ({
  blocks,
  edges,
  selected,
  onSelectBlock,
  onDeleteBlock,
  onDeleteEdge,
}) => {
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
        Commands[block.command],
        getCommandColor(block.command)
      );
      node.extras = { blockID: block.id };
      node.updateDimensions({ width: 100, height: 50 });
      node.addInPort("in");
      node.addOutPort("out");
      if (selected === block.id) node.setSelected(true);
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
          if (e.isSelected) {
            onSelectBlock((e.entity as Node).extras.blockID);
          } else onSelectBlock(null);
        },
        entityRemoved: e => {
          if (onDeleteBlock) onDeleteBlock((e.entity as Node).extras.blockID);
        },
      })
    );
    forOwn(engine.getDiagramModel().getLinks(), link =>
      link.addListener({
        entityRemoved: e => {
          if (onDeleteEdge)
            onDeleteEdge(
              (e.entity as any).sourcePort.parent.extras.blockID,
              (e.entity as any).targetPort.parent.extras.blockID
            );
        },
      })
    );
    engine.getDiagramModel().addListener({
      linksUpdated(event: BaseEvent & { link: LinkModel; isCreated: boolean }) {
        (event.link as any).setColor("#898989");
      },
    });
    // engine.repaintCanvas();
    engine.zoomToFit();
  }, [
    blocks,
    edges,
    engine,
    onDeleteBlock,
    onDeleteEdge,
    onSelectBlock,
    selected,
  ]);

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
