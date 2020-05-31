import React, { useMemo, useRef, useState } from "react";

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

const DiagramKonva: React.FC<DiagramKonvaProps> = ({
  blocks,
  edges,
  selected,
  onSelectBlock,
  onDeleteEdge,
}) => {
  const [hover, setHover] = useState<boolean>(false);
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

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <div
      ref={ref}
      style={{
        flexGrow: 1,
        overflow: "hidden",
        cursor: hover ? "pointer" : "initial",
      }}
    >
      <Stage width={size?.width} height={size?.height} draggable={true}>
        <Layer>
          {blocks.map(block => (
            <RenderBlock
              key={block.id}
              active={block.id === selected}
              block={block}
              position={layout.node(block.id)}
              onClick={() => onSelectBlock(block.id)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          ))}
          {layout.edges().map(edge => (
            <RenderEdge
              key={edge.v + edge.w}
              position={layout.edge(edge)}
              onClick={() => onDeleteEdge(edge.v, edge.w)}
            />
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

const RenderBlock: React.FC<{
  active: boolean;
  block: Block;
  position: dagre.Node;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ active, block, position, onClick, onMouseEnter, onMouseLeave }) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <Circle
        x={position.x}
        y={position.y}
        radius={active ? 12 : 10}
        fill={getCommandColor(block.command)}
        strokeWidth={active ? 3 : 1}
        stroke={hover || active ? "#000" : "#555"}
        onClick={onClick}
        onMouseEnter={() => {
          onMouseEnter();
          setHover(true);
        }}
        onMouseLeave={() => {
          onMouseLeave();
          setHover(false);
        }}
      />
      <Text
        x={position.x + 15}
        y={position.y - 5}
        text={Commands[block.command]}
        fontSize={12}
      />
    </>
  );
};

const RenderEdge: React.FC<{
  position: dagre.GraphEdge;
  onClick: () => void;
}> = ({ position, onClick }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Arrow
      x={0}
      y={0}
      points={position.points.reduce((acc, p) => acc.concat([p.x, p.y]), [])}
      stroke={hover ? "#b81839" : "#868686"}
      strokeWidth={hover ? 3 : 2}
      pointerLength={5}
      pointerWidth={5}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default DiagramKonva;
