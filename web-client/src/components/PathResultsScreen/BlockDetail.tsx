import React, { forwardRef, useEffect, useRef } from "react";

import { Box } from "grommet";
import { BoxProps } from "grommet/components/Box";
import { Commands } from "@testy/shared";
import { Cursor, Language, Subscript, View } from "grommet-icons";
import styled from "styled-components";

import { BlockWithAllData } from "./index";

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

interface IProps {
  active: boolean;
  setActive: (value: string) => void;
  hover: boolean;
  setHover: (hover: boolean) => void;
  block: BlockWithAllData;
}

const BlockDetail: React.FC<IProps> = ({
  active,
  setActive,
  block,
  hover,
  setHover,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll to active block
  useEffect(() => {
    if (active && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  const durationMs = block.finished_at - block.started_at;

  return (
    <BlockContainer
      ref={ref}
      active={active || hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setActive(block.id)}
    >
      <Line>
        {block.status} in {durationMs} ms
      </Line>
      <Line>
        <Input
          type="text"
          placeholder={Commands[block.command]}
          value={block.title ?? ""}
          disabled
        />
      </Line>
      <Line>
        <CommandsBar>
          {CommandsList.map(({ key, title, icon: Icon }) => (
            <Command key={key} title={title}>
              <Icon
                size="16px"
                color={block.command === key ? "#0d64d2" : undefined}
              />
            </Command>
          ))}
        </CommandsBar>
      </Line>
      <Line>
        <Label>Parameter</Label>
        <Input type="text" value={block.parameter ?? ""} disabled />
      </Line>
      <Line>
        <Label>Selector</Label>
        <Input type="text" value={block.selector ?? ""} disabled />
      </Line>
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
  border: 1px solid #c4c4c4;
  border-right-width: 0;
  padding: 5px;

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

  &:disabled {
    background: #f1f1f1;
  }
`;

export default BlockDetail;
