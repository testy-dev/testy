import React, { useEffect, useState } from "react";

import { ActionWithPayload, Block, Commands, ControlAction } from "shared";
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

  const [blockResult, setBlockResult] = useState<any>();

  React.useEffect((): (() => void) => {
    function handleMessageFromBackground({
      type,
      payload,
    }: ActionWithPayload): void {
      if (type === ControlAction.EXEC_LOCALLY) {
        setBlockResult(payload);
      }
    }
    chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

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
        <input
          type="button"
          value="Do it now in browser"
          onClick={() => {
            const message: ActionWithPayload = {
              type: ControlAction.EXEC_LOCALLY,
              payload: {
                ...block,
                command,
                selector,
                parameter,
              },
            };
            chrome.runtime.sendMessage(message);
          }}
        />
        result: {blockResult?.status ? "true" : "false"}
      </div>
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
