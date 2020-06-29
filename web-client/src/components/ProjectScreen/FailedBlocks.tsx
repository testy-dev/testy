import React from "react";

import { Block, BlockResult } from "@testy/shared";
import { Box, Text } from "grommet";
import TimeAgo from "react-timeago";
import styled from "styled-components";

import { SlugInput } from "./index";
import { useProjectFailedBlocksQuery } from "../../generated/graphql";

export const FailedBlocks: React.FC<SlugInput> = ({ orgSlug, projectSlug }) => {
  // const history = useHistory();
  const [{ data }] = useProjectFailedBlocksQuery({
    variables: { orgSlug, projectSlug },
  });

  const project = data?.project?.[0];
  const run = project?.run?.[0];

  return (
    <Box>
      <Text>
        {run?.failed_blocks?.length || 0} fails in last run,{" "}
        <TimeAgo date={run?.started_at} />
      </Text>
      <Box flex={false} direction="row" wrap>
        {run?.failed_blocks?.map((block: BlockResult) => {
          const inputBlock: Block = run?.graph?.blocks?.find(
            (b: Block) => b.id === block.id
          );
          return (
            <FailedBlock
              key={run.id}
              // onClick={() => {
              //   history.push(`${orgSlug}/${projectSlug}/`);
              // }}
            >
              <Text color="#e20b0b" margin={{ bottom: "small" }}>
                {block.msg}
              </Text>
              <Text>Command: {inputBlock.command}</Text>
              {!!inputBlock?.parameter && (
                <Text>Parameter: {inputBlock.parameter}</Text>
              )}
              {!!inputBlock?.selector && (
                <Text>Selector: {inputBlock.selector}</Text>
              )}
            </FailedBlock>
          );
        })}
      </Box>
    </Box>
  );
};

const FailedBlock = styled("div")`
  display: flex;
  flex-direction: column;

  padding: 8px;
  margin: 8px;
  border: 2px solid #e20b0b;
  border-radius: 4px;
  box-shadow: 3px 3px 15px gray;
  width: 200px;
  height: 200px;
`;
