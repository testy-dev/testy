import * as React from "react";

import { Block } from "../../types";

export interface CodeBlockProps {
  index: number;
  block: Block;
  dragStatus: string;
  destroyBlock: (i: number) => void;
  onDragStart: (e: React.DragEvent, i: number) => void;
  onDragOver: (e: React.DragEvent, i: number) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, i: number) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  index,
  block,
  destroyBlock,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  dragStatus,
}) => (
  <li
    className={dragStatus}
    draggable
    onDragStart={e => onDragStart(e, index)}
    onDragEnd={onDragEnd}
    onDragOver={e => onDragOver(e, index)}
    onDrop={e => onDrop(e, index)}
  >
    <span>
      {block.value.command}
      {block.value.selector && (
        <mark
          className="selector"
          onMouseEnter={() => {
            chrome.runtime.sendMessage({
              type: "highlight",
              payload: block.value.selector,
            });
          }}
        >
          {block.value.selector}
        </mark>
      )}
      {block.value.parameter && (
        <mark className="parameter">{block.value.parameter}</mark>
      )}
    </span>
    <button
      type="button"
      className="delete"
      onClick={() => destroyBlock(index)}
    >
      x
    </button>
  </li>
);

export default CodeBlock;
