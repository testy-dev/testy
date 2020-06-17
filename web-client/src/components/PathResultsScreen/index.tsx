import React, { useEffect, useMemo, useState } from "react";

import { Anchor, Box } from "grommet";
import { Block, BlockResult, JSONparse } from "@testy/shared";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

import BlockDetail from "./BlockDetail";

export interface BlockWithAllData extends Block, BlockResult {
  screenshot: string;
}

const PathResultsScreen: React.FC = () => {
  const params = useParams<{
    orgSlug: string;
    projectSlug: string;
    runPathId: string;
  }>();
  const pathId = +params.runPathId;
  const { data } = useQuery(
    gql`
      query($id: bigint!) {
        run_path_by_pk(id: $id) {
          id
          blocks_count
          blocks_success
          blocks_failed
          blocks_blocked
          edges
          credits
          started_at
          finished_at
          run {
            graph
          }
        }
      }
    `,
    { variables: { id: pathId } }
  );
  const [active, setActive] = useState<string>("");

  const edges: BlockWithAllData[] = useMemo(() => {
    const results = JSONparse(data?.run_path_by_pk?.edges ?? []);
    const blocks = data?.run_path_by_pk?.run?.graph?.blocks;

    return results.map((result: BlockResult) => ({
      ...result,
      ...blocks.find((block: Block) => block.id === result.id),
      screenshot: `https://storage.googleapis.com/testyx.appspot.com/paths/${pathId}/${result.id}.jpg`,
    }));
  }, [
    data?.run_path_by_pk?.edges,
    data?.run_path_by_pk?.run?.graph?.blocks,
    pathId,
  ]);

  useEffect(() => {
    if (!active && edges.length > 0) {
      setActive(edges[0].id);
    }
  }, [active, edges]);

  return (
    <Root>
      <Box flex="grow">
        <Box
          flex="grow"
          justify="center"
          align="center"
          background="dark-4"
          pad="small"
        >
          <img src={edges?.find(e => e.id === active)?.screenshot} />
        </Box>
        <Box direction="row">
          {edges.map(e => (
            <Box
              key={e.id}
              onClick={() => setActive(e.id)}
              pad="medium"
              style={{
                color: e.status === "success" ? "green" : "red",
                fontWeight: active === e.id ? "bold" : "normal",
              }}
            >
              {e.command}
            </Box>
          ))}
        </Box>
      </Box>
      <Column>
        <Link to={`/${params.orgSlug}/${params.projectSlug}`}>
          <Anchor as="span">Back to project overview</Anchor>
        </Link>
        <h1>Testy</h1>
        <Blocks blocks={edges} active={active} setActive={setActive} />
      </Column>
    </Root>
  );
};

const Blocks: React.FC<{
  blocks: BlockWithAllData[];
  active: string;
  setActive: (value: string) => void;
}> = ({ blocks, active, setActive }) => (
  <Box>
    {blocks.map(block => (
      <BlockDetail
        key={block.id}
        active={active === block.id}
        setActive={setActive}
        block={block}
        hover={false}
        setHover={() => null}
      />
    ))}
  </Box>
);

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  align-items: stretch;
`;

const Column = styled.div`
  flex: 350px 0 0;
  padding: 5px;
  border-left: 1px solid #cccccc;
  background: #f3f3f3;
  color: #444444;
  line-height: 1.5;
  overflow-y: auto;
`;
export default PathResultsScreen;
