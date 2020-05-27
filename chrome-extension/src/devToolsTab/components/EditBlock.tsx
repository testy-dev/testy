import React, { useEffect, useState } from "react";

import { Block, Commands } from "shared";
import { map } from "lodash";
import styled from "styled-components";

interface IProps {
  block: Block;
  onSave: (block: Block) => void;
}

const EditBlock: React.FC<IProps> = ({ block, onSave }) => {
  const [command, setCommand] = useState<Block["command"]>("click");
  const [selector, setSelector] = useState<string>();
  const [parameter, setParameter] = useState<string>();

  useEffect(() => {
    setCommand(block.command);
    setSelector(block.selector ?? "");
    setParameter(block.parameter ?? "");
  }, [block.command, block.parameter, block.selector]);

  const isChanged =
    block.command !== command ||
    block.selector !== selector ||
    block.parameter !== parameter;

  return (
    <>
      <div>
        Command:{" "}
        <select
          value={command}
          onChange={e => setCommand(e.target.value as Block["command"])}
        >
          {map(Commands, (value, key) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        Selector:{" "}
        <input
          type="text"
          value={selector}
          onChange={e => setSelector(e.target.value)}
        />
      </div>
      <div>
        Parameter:{" "}
        <input
          type="text"
          value={parameter}
          onChange={e => setParameter(e.target.value)}
        />
      </div>

      <Buttons>
        <input
          type="button"
          value="Update"
          disabled={!isChanged}
          onClick={() => {
            onSave({
              ...block,
              command,
              selector,
              parameter,
            });
          }}
        />
        <input
          type="button"
          value="Revert"
          disabled={!isChanged}
          onClick={() => {
            setCommand(block.command);
            setSelector(block.selector);
            setParameter(block.parameter);
          }}
        />
      </Buttons>
    </>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EditBlock;
