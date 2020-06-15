import React, { useEffect, useMemo, useState } from "react";

import { Block, BlockResult } from "@testy/shared";
import { Box } from "grommet";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const RunResult: React.FC = () => {
  const { pathId } = useParams();
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
    { variables: { id: +pathId } }
  );
  const [active, setActive] = useState<string>("");

  const edges: (Block &
    BlockResult & { screenshot: string })[] = useMemo(() => {
    const results = JSON.parse(data?.run_path_by_pk?.edges ?? "[]");
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
    <Box flex="grow">
      <Box flex="grow" justify="center" align="center" background="dark-4">
        <img src={edges?.find(e => e.id === active)?.screenshot} />
      </Box>
      <Box direction="row">
        {edges.map(e => (
          <Box
            key={e.id}
            onClick={() => setActive(e.id)}
            pad="medium"
            style={{ color: e.status === "success" ? "green" : "red" }}
          >
            {e.command}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RunResult;
