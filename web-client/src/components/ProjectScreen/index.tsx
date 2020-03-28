import React, { Suspense } from "react";

import { Box, Button, Heading, Text } from "grommet";
import { graphql } from "@gqless/react";
import { useHistory, useParams } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";
import { query } from "../../graphql";
import Logo from "../Logo";

const ProjectScreen: React.FC = () => {
  const history = useHistory();
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
        <Button
          label="Open editor"
          size="large"
          onClick={() => history.push(`/${orgSlug}/${projectSlug}/editor`)}
        />
      </Box>
    </Box>
  );
};

interface SlugInput {
  orgSlug: string;
  projectSlug: string;
}

const ProjectHeader = graphql(({ projectSlug, orgSlug }: SlugInput) => {
  const name = query.project({
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
  })?.[0].name;
  return <Heading level={1}>Project {name}</Heading>;
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
          run_history {
            id
            commands_done
            commands_failed
            commands_total
          }
          run_history_aggregate {
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

  const project = data.project?.[0];
  if (!project) return <Text>Not found</Text>;

  return (
    <Box>
      <Heading level={2}>
        History ({project.run_history_aggregate.aggregate.count} items)
      </Heading>
      <Box>
        {project.run_history.map((h: any) => (
          <Box key={h.id}>
            <Text>
              #{h.id}, {h.commands_done} done, {h.commands_failed} failed, from{" "}
              {h.commands_total} total
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectScreen;
