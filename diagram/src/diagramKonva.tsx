import React, { useMemo, useRef } from "react";

import * as dagre from "dagre";
import { Arrow, Circle, Layer, Stage, Text } from "react-konva";
import { Block, Commands, Edge, UUID } from "shared/src";
import useComponentSize from "@rehooks/component-size";

interface DiagramKonvaProps {
  blocks: Block[];
  edges: Edge[];
  selected: UUID | null;
  onSelectBlock: (blockID: UUID | null) => void;
  onDeleteBlock?: (blockID: UUID) => void;
  onCreateEdge?: (from: UUID, to: UUID) => void;
  onDeleteEdge?: (from: UUID, to: UUID) => void;
}

const BLOCK_WIDTH = 70;
const BLOCK_HEIGHT = 30;

const DiagramKonva: React.FC<DiagramKonvaProps> = ({ blocks, edges }) => {
  const ref = useRef(null);
  const size = useComponentSize(ref);

  const layout = useMemo(() => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(() => ({}));

    blocks.forEach(block =>
      g.setNode(block.id, {
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
      })
    );
    edges.forEach(edge => g.setEdge(edge[0], edge[1]));
    dagre.layout(g);
    return g;
  }, [blocks, edges]);
  console.log(layout);

  return (
    <div ref={ref} style={{ flexGrow: 1, overflow: "hidden" }}>
      <Stage width={size?.width} height={size?.height} draggable={true}>
        <Layer>
          {blocks.map(block => (
            <RenderBlock
              key={block.id}
              block={block}
              position={layout.node(block.id)}
            />
          ))}
          {layout.edges().map(edge => (
            <RenderEdge key={edge.v + edge.w} position={layout.edge(edge)} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

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

const RenderBlock: React.FC<{ block: Block; position: dagre.Node }> = ({
  block,
  position,
}) => (
  <>
    <Circle
      x={position.x}
      y={position.y}
      radius={10}
      fill={getCommandColor(block.command)}
      strokeWidth={1}
      stroke="#555"
    />
    <Text
      x={position.x + 15}
      y={position.y - 5}
      text={Commands[block.command]}
      fontSize={12}
    />
  </>
);

const RenderEdge: React.FC<{ position: dagre.GraphEdge }> = ({ position }) => (
  <>
    <Arrow
      x={0}
      y={0}
      points={position.points.reduce((acc, p) => acc.concat([p.x, p.y]), [])}
      stroke="#555"
      strokeWidth={2}
      pointerLength={5}
      pointerWidth={5}
    />
  </>
);

export default DiagramKonva;
