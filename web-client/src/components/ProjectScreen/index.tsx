import React, { Suspense } from "react";

import { Box, Button, Heading, Text } from "grommet";
import { graphql } from "@gqless/react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { fetchQuery, query } from "../../graphql";
import Logo from "../Logo";

const ProjectScreen: React.FC = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();
  return (
    <Box direction="row" fill>
      {/* User */}
      <Box basis="1/3" flex={false} pad="medium">
        <Logo />
        <Suspense fallback="Loading ...">
          <ProjectHeader orgSlug={orgSlug} projectSlug={projectSlug} />
          <ProjectHistory orgSlug={orgSlug} projectSlug={projectSlug} />
        </Suspense>
      </Box>

      {/* Screenshot */}
      <Box
        flex="grow"
        background="light-3"
        pad="medium"
        justify="center"
        align="center"
        gap="medium"
      >
        <Text size="large">Tree of commands</Text>
      </Box>
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
          if(!id) return;
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

const ProjectHistory = ({ orgSlug, projectSlug }: SlugInput) => {
  const { data, loading } = useQuery(
    gql`
      query($projectSlug: String!, $orgSlug: String!) {
        project(
          where: {
            slug: { _eq: $projectSlug }
            organization: { slug: { _eq: $orgSlug } }
          }
        ) {
          id
          name
          run {
              id
              paths {
                  id
                  status
              }
          }
          run_aggregate {
              aggregate {
                  count
              }
          }
        }
      }
    `,
    {
      variables: {
        orgSlug,
        projectSlug,
      },
    }
  );
  if (loading) return <Text>Loading...</Text>;

  const project = data?.project?.[0];
  if (!project) return <Text>Not found</Text>;

  return (
    <Box>
      <Heading level={2}>
        History ({project.run_aggregate.aggregate.count} items)
      </Heading>
      <Box>
        {project.run.map((run: any) => (
          <Box key={run.id}>
            <Text>
              Run {run.id}
              <div>
              {run.paths.map((path: any) => <div key={path.id}>path {path.id}, status {path.status ?? "INITIALIZATION"}</div>)}
              </div>
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectScreen;
