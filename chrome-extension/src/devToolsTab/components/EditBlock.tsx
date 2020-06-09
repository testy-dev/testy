import React, { forwardRef, useEffect, useRef, useState } from "react";

import { ActionWithPayload, Block, ControlAction } from "@testy/shared";
import { Box } from "grommet";
import { BoxProps } from "grommet/components/Box";
import { Cursor, Language, Subscript, View } from "grommet-icons";
import styled from "styled-components";

interface IProps {
  active: boolean;
  hover: boolean;
  setHover: (hover: boolean) => void;
  block: Block;
  onSave: (block: Block) => void;
}

const CommandsList = [
  {
    key: "click",
    title: "Click",
    icon: Cursor,
  },
  {
    key: "type",
    title: "Type",
    icon: Subscript,
  },
  {
    key: "visit",
    title: "Visit",
    icon: Language,
  },
  {
    key: "check-contains-text",
    title: "Check",
    icon: View,
  },
];

const EditBlock: React.FC<IProps> = ({
  active,
  block,
  hover,
  setHover,
  onSave,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [command, setCommand] = useState<Block["command"]>("click");
  const [selector, setSelector] = useState<string>();
  const [parameter, setParameter] = useState<string>();

  const [runNowStatus, setRunNowStatus] = useState<boolean | null>(null);

  // Scroll to active block
  useEffect(() => {
    if (active && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  // Get status when run element
  useEffect((): (() => void) => {
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

  // Update form if change input
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
    <BlockContainer
      ref={ref}
      active={active || hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
        <CommandsBar>
          {CommandsList.map(({ key, title, icon: Icon }) => (
            <Command
              key={key}
              onClick={() => setCommand(key as Block["command"])}
              title={title}
            >
              <Icon
                size="16px"
                color={command === key ? "#0d64d2" : undefined}
              />
            </Command>
          ))}
        </CommandsBar>
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
  forwardRef<
    HTMLDivElement,
    { active?: boolean } & BoxProps & JSX.IntrinsicElements["div"]
  >((props, ref) => (
    <Box direction="column" gap="xsmall" ref={ref} {...props} />
  ))
)`
  padding: 5px;
  margin: 5px 0;
  border: 2px solid ${p => (p.active ? "#0d64d2" : "#fff")};
  border-radius: 5px;
  box-shadow: 2px 2px 10px -3px gray;
  background: white;
`;

const Label = styled.span``;

const CommandsBar = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 0;
`;

const Command = styled.div`
  cursor: pointer;
  border: 1px solid #c4c4c4;
  border-right-width: 0;
  padding: 5px;

  &:hover {
    background: #c4c4c4;
  }

  &:last-child {
    border-right-width: 1px;
  }
`;

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
