import React, { Suspense, useState } from "react";

import { Box, Button, Heading, Text } from "grommet";
import { Diagram } from "@testy/diagram";
import { Graph } from "@testy/shared";
import { gql, useSubscription } from "@apollo/client";
import { graphql } from "@gqless/react";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";

import { fetchQuery, query } from "../../graphql";
import Logo from "../Logo";

const ProjectScreen: React.FC = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [openedHistory, setOpenedHistory] = useState<number | null>(null);
  const [hoverBlock, setHoverBlock] = useState<string | null>(null);
  return (
    <Box direction="row" fill>
      <Box
        basis="1/3"
        flex={false}
        pad="medium"
        background="light-3"
        overflow={{ vertical: "auto" }}
      >
        <Logo />
        <Suspense fallback="Loading ...">
          <ProjectHeader orgSlug={orgSlug} projectSlug={projectSlug} />
          <ProjectHistory
            orgSlug={orgSlug}
            projectSlug={projectSlug}
            openedHistory={openedHistory}
            onOpenHistory={(id, graph) => {
              setOpenedHistory(id);
              setGraph(graph);
            }}
          />
        </Suspense>
      </Box>

      <Diagram
        blocks={graph?.blocks ?? []}
        edges={graph?.edges ?? []}
        hoverBlock={hoverBlock}
        setHoverBlock={setHoverBlock}
        selected={null}
        onSelectBlock={() => null}
      />
    </Box>
  );
};

interface SlugInput {
  orgSlug: string;
  projectSlug: string;
}

const ProjectHeader = graphql(({ projectSlug, orgSlug }: SlugInput) => {
  const project = query.project({
    where: {
      // @ts-ignore
      slug: { _eq: projectSlug },
      organization: {
        // @ts-ignore
        slug: {
          _eq: orgSlug,
        },
      },
    },
  })?.[0];
  const name = project.name;
  const id = project.id;
  return (
    <Box direction="row" align="center" justify="between" flex={false}>
      <Heading level={1}>Project {name}</Heading>
      <Button
        label="Run now"
        primary
        onClick={() => {
          if (!id) return;
          fetchQuery(
            // language=graphql
            `
mutation ($project_id: Int!, $run_by_user: Int!) {
  insert_run_one(object: {project_id: $project_id, run_by_user: $run_by_user}) {
    id
  }
}
            `,
            { project_id: id, run_by_user: 1 }
          );
        }}
      />
    </Box>
  );
});

interface ProjectHistoryProps extends SlugInput {
  openedHistory: number | null;
  onOpenHistory: (id: number, graph: Graph) => void;
}

const ProjectHistory: React.FC<ProjectHistoryProps> = ({
  orgSlug,
  projectSlug,
  openedHistory,
  onOpenHistory,
}) => {
  const { data, loading } = useSubscription(
    gql`
      subscription($projectSlug: String!, $orgSlug: String!) {
        project(
          where: {
            slug: { _eq: $projectSlug }
            organization: { slug: { _eq: $orgSlug } }
          }
        ) {
          id
          graph
          run_aggregate {
            aggregate {
              count
            }
          }
          run(order_by: { started_at: desc }) {
            id
            started_at
            graph
            paths(order_by: { id: asc }) {
              id
              edges
              blocks_count
              blocks_success
              blocks_failed
              blocks_blocked
              credits
            }
            paths_aggregate {
              aggregate {
                sum {
                  credits
                  blocks_blocked
                  blocks_count
                  blocks_failed
                  blocks_success
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { orgSlug, projectSlug },
    }
  );
  const handleOpen = (run: any) => {
    const counter = run.paths.reduce(
      (
        acc: {
          success: { [blockID: string]: number };
          fail: { [blockID: string]: number };
        },
        path: any
      ) => {
        const edges = JSON.parse(path.edges);
        edges.forEach((block: any) => {
          if (block.state === "success") {
            acc.success[block.id] = acc.success[block.id] + 1 || 1;
          }
          if (block.state === "failed") {
            acc.fail[block.id] = acc.fail[block.id] + 1 || 1;
          }
        });
        return acc;
      },
      { success: {}, fail: {} }
    );

    const graph = {
      edges: run.graph.edges,
      blocks: run.graph.blocks.map((block: any) => {
        const success = counter.success?.[block.id] ?? 0;
        const fail = counter.fail?.[block.id] ?? 0;
        // success 0, fail 0 => unknown
        // success > 0, fail 0 => success
        // success 0, fail > 0 => fail
        // success > 0, fail > 0 => warning
        return {
          ...block,
          status:
            success > 0
              ? fail > 0
                ? "warning"
                : "success"
              : fail > 0
              ? "fail"
              : "unknown",
        };
      }),
    };
    onOpenHistory(run.id, graph);
  };

  if (loading) return <Text>Loading...</Text>;

  const project = data?.project?.[0];
  if (!project) return <Text>Not found</Text>;

  return (
    <Box flex={false} gap="xsmall">
      <Box background="light-1" pad="small">
        Actual state
      </Box>
      {project.run.map((run: any) => {
        const opened = run.id === openedHistory;
        const sum = run?.paths_aggregate?.aggregate?.sum;
        return (
          <Box
            key={run.id}
            background="light-1"
            pad="small"
            onClick={() => handleOpen(run)}
            border={{
              side: "left",
              size: "medium",
              color: getStatus(
                sum.blocks_success,
                sum.blocks_failed,
                sum.blocks_count
              ),
            }}
          >
            <Box direction="row" justify="between">
              <Text>
                {Math.round((sum?.blocks_success / sum?.blocks_count) * 100)}% -{" "}
                {sum?.blocks_failed} fails
              </Text>
              <Text>
                {sum?.credits ?? 0} credits, <TimeAgo date={run.started_at} />
              </Text>
            </Box>
            <Text>
              {/*{sum?.blocks_count} blocks ({sum?.blocks_success} success,{" "}*/}
              {/*, {sum?.blocks_blocked} blocked),{" "}*/}
              {/*{sum?.credits} credits*/}
            </Text>
            {opened && <RunDetail run={run} />}
          </Box>
        );
      })}
    </Box>
  );
};

const RunDetail: React.FC<{ run: any }> = ({ run }) => {
  const failingBlocks = run.paths.flatMap((path: any) => {
    const edges = JSON.parse(path.edges);
    return edges.find((edge: any) => edge?.state === "failed") || [];
  });
  return (
    <div>
      {failingBlocks.map((block: any) => (
        <Text key={block.id} style={{ display: "block" }}>
          {block.command} {block?.parameter} {block?.selector} {block?.msg}
        </Text>
      ))}
      {run.paths.map((path: any) => (
        <Text
          key={path.id + "path"}
          style={{ display: "block" }}
          color={getStatus(
            path.blocks_success,
            path.blocks_failed,
            path.blocks_count
          )}
        >
          path #{path.id} - {path?.blocks_count} blocks ({path?.blocks_success}{" "}
          success, {path?.blocks_failed} failed, {path?.blocks_blocked}{" "}
          blocked), {path?.credits} credits
        </Text>
      ))}
    </div>
  );
};

const getStatus = (pass: number, fail: number, total: number) =>
  fail > 0 ? "status-error" : pass === total ? "status-ok" : "status-unknown";

export default ProjectScreen;
