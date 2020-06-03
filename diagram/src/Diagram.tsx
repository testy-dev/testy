import React, { useEffect, useMemo, useRef, useState } from "react";

import * as dagre from "dagre";
import { Arrow, Circle, Layer, Stage, Text } from "react-konva";
import { Block, Commands, DiagramBlockState, Edge, UUID } from "@testy/shared";
import { throttle } from "lodash";
import Konva from "konva";
import styled from "styled-components";
import useComponentSize from "@rehooks/component-size";

import ContextMenu from "./ContextMenu";

interface DiagramProps {
  blocks: (Block & { state?: DiagramBlockState })[];
  edges: Edge[];
  selected: UUID | null;
  path?: UUID[];
  hoverBlock: UUID | null;
  setHoverBlock: (id: UUID | null) => void;
  onSelectBlock: (blockID: UUID | null) => void;
  onDeleteBlock?: (blockID: UUID) => void;
  onCreateEdge?: (from: UUID, to: UUID) => void;
  onDeleteEdge?: (from: UUID, to: UUID) => void;
}

const BLOCK_WIDTH = 70;
const BLOCK_HEIGHT = 30;

function useThrottleValue<T>(input: T, waitMs: number) {
  const [value, setValue] = useState<T>(input);
  const throttled = useRef(
    throttle((newValue: T) => setValue(newValue), waitMs)
  );

  useEffect(() => throttled.current(input), [input]);

  return value;
}

const Diagram: React.FC<DiagramProps> = ({
  blocks,
  edges,
  selected,
  path = [],
  hoverBlock,
  setHoverBlock,
  onSelectBlock,
  // onDeleteEdge,
}) => {
  const [hoverCursor, setHoverCursor] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const ref = useRef(null);
  const _realtimeSize = useComponentSize(ref);
  const size = useThrottleValue(_realtimeSize, 1000);

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

  const onMouseEnter = (blockID: string) => {
    setHoverCursor(true);
    setHoverBlock(blockID);
  };
  const onMouseLeave = () => {
    setHoverCursor(false);
    setHoverBlock(null);
  };

  return (
    <Root ref={ref} hover={hoverCursor}>
      <Stage width={size?.width} height={size?.height} draggable={true}>
        <Layer>
          {layout.edges().map(edge => (
            <RenderEdge
              key={edge.v + edge.w}
              inPath={path.includes(edge.v) && path.includes(edge.w)}
              position={layout.edge(edge)}
              onContextMenu={e => {
                setContextMenu({ x: e.evt.x, y: e.evt.y });
                console.log(e);
              }}
            />
          ))}
          {blocks.map(block => (
            <RenderBlock
              key={block.id}
              active={block.id === selected}
              block={block}
              position={layout.node(block.id)}
              hover={hoverBlock === block.id}
              onClick={() => onSelectBlock(block.id)}
              onMouseEnter={() => onMouseEnter(block.id)}
              onMouseLeave={() => onMouseLeave()}
            />
          ))}
        </Layer>
      </Stage>
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          items={[
            { text: "Create block here", onClick: () => null },
            {
              text: "Remove edge",
              onClick: () => null,
            },
          ]}
          onClose={() => setContextMenu(null)}
        />
      )}
    </Root>
  );
};

const Root = styled.div<{ hover: boolean }>`
  display: flex;
  flex: auto 1 1;
  overflow: hidden;
  position: relative;
  cursor: ${p => (p.hover ? "pointer" : "initial")};
`;

const getStateColor = (state: DiagramBlockState): string => {
  switch (state) {
    case "unknown":
      return "#868686";
    case "success":
      return "#48d760";
    case "fail":
      return "#e73030";
    case "warning":
      return "#f57049";
  }
};

const getCommandColor = (command: Block["command"]): string => {
  switch (command) {
    case "click":
    case "dblclick":
    case "submit":
      return "#48d760";
    case "check-contains-text":
      return "#4e90d5";
    case "type":
      return "#e7e630";
    case "visit":
      return "#d285b6";
    default:
      return "#5f5f5f";
  }
};

const RenderBlock: React.FC<{
  active: boolean;
  block: Block & { state?: DiagramBlockState };
  position: dagre.Node;
  onClick: () => void;
  hover: boolean;
  onMouseEnter: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseLeave: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}> = ({
  active,
  block,
  position,
  hover,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <>
    <Circle
      x={position.x}
      y={position.y}
      radius={active ? 12 : 10}
      fill={
        block?.state
          ? getStateColor(block.state)
          : getCommandColor(block.command)
      }
      strokeWidth={hover || active ? 3 : 0}
      stroke={hover || active ? "#0d64d2" : undefined}
      onClick={onClick}
      onMouseEnter={e => {
        onMouseEnter(e);
      }}
      onMouseLeave={e => {
        onMouseLeave(e);
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

const RenderEdge: React.FC<{
  inPath: boolean;
  position: dagre.GraphEdge;
  onContextMenu: (e: Konva.KonvaEventObject<PointerEvent>) => void;
}> = ({ inPath, position, onContextMenu }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Arrow
      x={0}
      y={0}
      points={position.points.reduce<number[]>(
        (acc, p) => acc.concat([p.x, p.y]),
        []
      )}
      stroke={hover ? "#24b1ff" : inPath ? "#494949" : "#a8a8a8"}
      strokeWidth={hover ? 3 : 2}
      hitStrokeWidth={15}
      pointerLength={5}
      pointerWidth={5}
      onClick={onContextMenu}
      onTap={onContextMenu}
      onContextMenu={e => {
        e.evt.preventDefault();
        onContextMenu(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default Diagram;
