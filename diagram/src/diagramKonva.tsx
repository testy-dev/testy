import React, { useRef } from "react";

import { Arrow, Circle, Layer, Stage, Text } from "react-konva";
import { Block, Edge, UUID } from "shared/src";
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

const DiagramKonva: React.FC<DiagramKonvaProps> = ({ blocks }) => {
  const ref = useRef(null);
  const size = useComponentSize(ref);

  return (
    <div ref={ref} style={{ flexGrow: 1, overflow: "hidden" }}>
      <Stage width={size?.width} height={size?.height} draggable={true}>
        <Layer>
          {blocks.map((block, index) => (
            <React.Fragment key={block.id}>
              <Circle
                x={20}
                y={20 + index * 50}
                radius={10}
                fill="#555"
                strokeWidth={1}
                stroke="#555"
              />
              <Text
                x={40}
                y={14 + index * 50}
                text={block.command}
                fontSize={12}
              />
              <Arrow
                x={20}
                y={30 + index * 50}
                points={[0, 0, 0, 30]}
                stroke="#555"
                strokeWidth={2}
                pointerLength={5}
                pointerWidth={5}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DiagramKonva;
