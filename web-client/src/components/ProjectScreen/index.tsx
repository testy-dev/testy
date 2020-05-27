import React, { Suspense, useState } from "react";

import { Box, Button, Heading, Text } from "grommet";
import { Diagram } from "diagram";
import { Graph } from "shared";
import { gql, useSubscription } from "@apollo/client";
import { graphql } from "@gqless/react";
import { useParams } from "react-router-dom";

import { fetchQuery, query } from "../../graphql";
import Logo from "../Logo";

const ProjectScreen: React.FC = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();
  const [graph, setGraph] = useState<Graph | null>(null);
  return (
    <Box direction="row" fill>
      <Box basis="1/3" flex={false} pad="medium" background="light-3">
        <Logo />
        <Suspense fallback="Loading ...">
          <ProjectHeader orgSlug={orgSlug} projectSlug={projectSlug} />
          <ProjectHistory
            orgSlug={orgSlug}
            projectSlug={projectSlug}
            onSelectGraph={graph => setGraph(graph)}
          />
        </Suspense>
      </Box>

      <Diagram
        blocks={graph?.blocks ?? []}
        edges={graph?.edges ?? []}
        onSelectBlock={() => null}
        selected={null}
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
    <Box direction="row" align="center" justify="between">
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
  onSelectGraph: (graph: Graph) => void;
}

const ProjectHistory: React.FC<ProjectHistoryProps> = ({
  orgSlug,
  projectSlug,
  onSelectGraph,
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
          run_aggregate {
            aggregate {
              count
            }
          }
          run {
            id
            graph
            paths {
              id
              status
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

  if (loading) return <Text>Loading...</Text>;

  const project = data?.project?.[0];
  if (!project) return <Text>Not found</Text>;

  return (
    <Box>
      <Heading level={2}>
        History ({project?.run_aggregate?.aggregate?.count ?? 0} items)
      </Heading>
      <Box>
        {project.run.map((run: any) => {
          const sum = run?.paths_aggregate?.aggregate?.sum;
          return (
            <Box key={run.id} onClick={() => onSelectGraph(run.graph)}>
              <Text>
                <div>
                  Run {run.id}, {sum?.blocks_count} blocks (
                  {sum?.blocks_success} success, {sum?.blocks_failed} failed,{" "}
                  {sum?.blocks_blocked} blocked), {sum?.credits} credits
                </div>
                <div>
                  {run.paths.map((path: any) => (
                    <div key={path.id}>
                      path {path.id}, status {path.status ?? "INITIALIZATION"}
                    </div>
                  ))}
                </div>
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProjectScreen;
