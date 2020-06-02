import React, { useEffect, useState } from "react";

import {
  ActionWithPayload,
  Block,
  Commands,
  ControlAction,
} from "@testy/shared";
import { Box } from "grommet";
import { map } from "lodash";
import styled from "styled-components";

interface IProps {
  active?: boolean;
  block: Block;
  onSave: (block: Block) => void;
}

const EditBlock: React.FC<IProps> = ({ active, block, onSave }) => {
  const [command, setCommand] = useState<Block["command"]>("click");
  const [selector, setSelector] = useState<string>();
  const [parameter, setParameter] = useState<string>();

  const [runNowStatus, setRunNowStatus] = useState<boolean | null>(null);

  React.useEffect((): (() => void) => {
    function handleMessageFromBackground({
      type,
      payload,
    }: ActionWithPayload): void {
      if (type === ControlAction.EXEC_LOCALLY) {
        setRunNowStatus(payload.status);
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
    setRunNowStatus(null);
  }, [block.command, block.parameter, block.selector]);

  const isChanged =
    block.command !== command ||
    block.selector !== selector ||
    block.parameter !== parameter;

  return (
    <BlockContainer active={active}>
      <Line>
        <Input type="text" />
        <input
          type="button"
          value="Run now"
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
        {runNowStatus === true && "ok"}
        {runNowStatus === false && "fail"}
      </Line>
      <Line>
        <Label>Command</Label>
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
      </Line>
      <Line>
        <Label>Parameter</Label>
        <Input
          type="text"
          value={parameter ?? ""}
          onChange={e => setParameter(e.target.value)}
        />
      </Line>
      <Line>
        <Label>Selector</Label>
        <Input
          type="text"
          value={selector ?? ""}
          onChange={e => setSelector(e.target.value)}
        />
      </Line>

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
    </BlockContainer>
  );
};

const BlockContainer = styled(
  (props: { active?: boolean; children: React.ReactNode }) => (
    <Box direction="column" gap="xsmall" {...props} />
  )
)`
  padding: 5px;
  margin: 5px 0;
  border: 2px solid ${p => (p.active ? "#0d64d2" : "#fff")};
  border-radius: 5px;
  box-shadow: 2px 2px 10px -3px gray;
  background: white;
`;

const Label = styled.span``;

const Line = (props: any) => (
  <Box direction="row" gap="xsmall" align="baseline" {...props} />
);

const Input = styled.input`
  border: 1px solid #c4c4c4;
  padding: 3px 5px;
  flex-grow: 1;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EditBlock;
