import React, { useEffect, useRef } from "react";

import styled from "styled-components";

export interface Position {
  x: number;
  y: number;
}

interface IProps {
  position: Position;
  items: { text: string; onClick: () => void }[];
  onClose: () => void;
}

const ContextMenu: React.FC<IProps> = ({ items, position, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => onClose());

  return (
    <MenuList ref={ref} x={position.x} y={position.y}>
      {items.map(item => (
        <MenuItem
          key={item.text}
          onClick={() => {
            onClose();
            item.onClick();
          }}
        >
          {item.text}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const MenuList = styled.div<Position>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;

  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 1px 1px 10px -3px #848484;
  border: 1px solid #cccccc;
`;

const MenuItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background: #dbdbdb;
  }
`;

function useOnClickOutside(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default ContextMenu;
