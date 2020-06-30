import React, { useEffect, useMemo, useRef, useState } from "react";

import * as dagre from "dagre";
import {
  Arrow,
  Circle,
  KonvaNodeEvents,
  Layer,
  Stage,
  Text,
} from "react-konva";
import { Block, Commands, DiagramBlockState, Edge, UUID } from "@testy/shared";
import { throttle } from "lodash";
import Konva from "konva";
import styled from "styled-components";
import useComponentSize from "@rehooks/component-size";

import ContextMenu, {
  ContextMenuItem,
  ContextMenuPosition,
} from "./ContextMenu";

interface DiagramProps {
  blocks: (Block & { state?: DiagramBlockState })[];
  edges: Edge[];
  selected: UUID | null;
  path?: UUID[];
  hoverBlock: UUID | null;
  setHoverBlock: (id: UUID | null) => void;
  onSelectBlock: (blockID: UUID | null) => void;
  onCreateBlock?: (inConn: UUID | null, outConn: UUID | null) => void;
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
  onCreateBlock,
  onSelectBlock,
  onDeleteBlock,
  onCreateEdge,
  onDeleteEdge,
}) => {
  const [hoverCursor, setHoverCursor] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{
    position: ContextMenuPosition;
    items: ContextMenuItem[];
  } | null>(null);
  const ref = useRef(null);
  const _realtimeSize = useComponentSize(ref);
  const size = useThrottleValue(_realtimeSize, 1000);

  const [edgeFrom, setEdgeFrom] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<[number, number] | null>(
    null
  );

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

  const edgeFromPosition = useMemo(() => {
    if (edgeFrom) {
      const block = layout.node(edgeFrom);
      return [block.x, block.y];
    } else {
      return null;
    }
  }, [edgeFrom, layout]);

  const handleCreateEdge = (to: UUID) => {
    if (onCreateEdge && edgeFrom) {
      const graphClone = dagre.graphlib.json.read(
        // clone graph
        dagre.graphlib.json.write(layout)
      );
      graphClone.setEdge(edgeFrom, to); // add edge
      // check cycle
      if (dagre.graphlib.alg.isAcyclic(graphClone)) {
        onCreateEdge(edgeFrom, to);
        setEdgeFrom(null);
      }
    }
  };

  const onMouseEnter = (blockID: UUID) => {
    setHoverCursor(true);
    setHoverBlock(blockID);
  };
  const onMouseLeave = () => {
    setHoverCursor(false);
    setHoverBlock(null);
  };

  return (
    <Root ref={ref} hover={hoverCursor} newLink={edgeFrom !== null}>
      <Stage
        width={size?.width}
        height={size?.height}
        draggable={true}
        onContextMenu={e => {
          // Target is stage
          if (e.target === e.currentTarget) {
            e.evt.preventDefault();
            setContextMenu({
              position: { x: e.evt.x, y: e.evt.y },
              items: edgeFrom
                ? [
                    {
                      text: "Cancel link creation",
                      onClick: () => setEdgeFrom(null),
                    },
                  ]
                : [
                    {
                      text: "Create new block",
                      onClick: () => {
                        if (onCreateBlock) onCreateBlock(null, null);
                      },
                    },
                  ],
            });
          }
        }}
        onMouseMove={e => {
          if (edgeFrom) {
            setMousePosition([
              e.evt.x - (e.currentTarget.attrs.x || 0),
              e.evt.y - (e.currentTarget.attrs.y || 0),
            ]);
          }
        }}
      >
        <Layer>
          {layout.edges().map(edge => {
            const inPathIndex = path.indexOf(edge.v);
            const outPathIndex = path.indexOf(edge.w);
            return (
              <RenderEdge
                key={edge.v + edge.w}
                inPath={
                  inPathIndex >= 0 &&
                  outPathIndex >= 0 &&
                  inPathIndex + 1 === outPathIndex
                }
                position={layout.edge(edge)}
                onContextMenu={e => {
                  setContextMenu({
                    position: { x: e.evt.x, y: e.evt.y },
                    items: [
                      {
                        text: "Create block here",
                        onClick: () => {
                          if (onCreateBlock) onCreateBlock(edge.v, edge.w);
                        },
                      },
                      {
                        text: "Remove edge",
                        onClick: () => {
                          if (onDeleteEdge) onDeleteEdge(edge.v, edge.w);
                        },
                      },
                    ],
                  });
                }}
              />
            );
          })}
          {blocks.map(block => (
            <RenderBlock
              key={block.id}
              active={block.id === selected}
              block={block}
              position={layout.node(block.id)}
              hover={hoverBlock === block.id}
              onClick={() => {
                onSelectBlock(block.id);
                if (edgeFrom) handleCreateEdge(block.id);
              }}
              onMouseEnter={() => onMouseEnter(block.id)}
              onMouseLeave={() => onMouseLeave()}
              onContextMenu={e => {
                e.evt.preventDefault();
                setContextMenu({
                  position: { x: e.evt.x, y: e.evt.y },
                  items: [
                    {
                      text: "Create new link",
                      onClick: () => setEdgeFrom(block.id),
                    },
                    {
                      text: "Delete block",
                      onClick: () => {
                        if (onDeleteBlock) onDeleteBlock(block.id);
                      },
                    },
                  ],
                });
              }}
            />
          ))}

          {edgeFromPosition !== null && mousePosition !== null && (
            <Arrow
              x={0}
              y={0}
              points={[...edgeFromPosition, ...mousePosition]}
              stroke="#36922d"
              strokeWidth={3}
              pointerLength={5}
              pointerWidth={5}
              listening={false}
            />
          )}
        </Layer>
      </Stage>
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}
    </Root>
  );
};

const Root = styled.div<{ hover: boolean; newLink: boolean }>`
  display: flex;
  flex: auto 1 1;
  overflow: hidden;
  position: relative;
  cursor: ${p => (p.newLink ? "cell" : p.hover ? "pointer" : "initial")};
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

interface RenderBlockProps
  extends Partial<Konva.CircleConfig>,
    KonvaNodeEvents {
  active: boolean;
  block: Block & { status?: DiagramBlockState };
  position: dagre.Node;
  onClick: () => void;
  hover: boolean;
}

const RenderBlock: React.FC<RenderBlockProps> = ({
  active,
  block,
  position,
  hover,
  onClick,
  ...props
}) => (
  <>
    <Circle
      x={position.x}
      y={position.y}
      radius={active ? 12 : 10}
      fill={
        block?.status
          ? getStateColor(block.status)
          : getCommandColor(block.command)
      }
      strokeWidth={hover || active ? 3 : 0}
      stroke={hover || active ? "#0d64d2" : undefined}
      onClick={onClick}
      {...props}
    />
    <Text
      x={position.x + 15}
      y={position.y - 5}
      text={block.title ?? Commands[block.command]}
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
