import React, { Suspense } from "react";

import { Box, Heading, Text } from "grommet";
import { graphql } from "@gqless/react";
import { useHistory } from "react-router-dom";

import { Me } from "../../graphql/extensions";
import { query } from "../../graphql";
import CreateOrganization from "./CreateOrganization";
import CreateProject from "./CreateProject";
import Logo from "../Logo";

const HomeScreen: React.FC = () => {
  const handleCreateOrganization = React.useCallback(() => {
    window.location.reload();
  }, []);
  return (
    <Box direction="row" fill>
      {/* Screenshot */}
      <Box flex="grow" pad="medium">
        <Logo />
        <Box direction="row" align="center">
          <Heading level={2}>Organizations</Heading>
          <CreateOrganization onCreate={handleCreateOrganization} />
        </Box>
        <Suspense fallback="Loading ...">
          <Organizations />
        </Suspense>
      </Box>

      {/* User */}
      <Box basis="350px" background="light-3" flex={false} align="center">
        <Heading level={2}>Me</Heading>
        <Suspense fallback="Loading ...">
          <MyProfile />
        </Suspense>
      </Box>
    </Box>
  );
};

const Organizations = graphql(() => {
  const history = useHistory();
  return (
    <Box direction="row-responsive">
      {query.organization.map(org => {
        const orgSlug = org.slug;
        return (
          <Box
            key={org.id}
            background="light-3"
            pad="small"
            margin={{ right: "small", bottom: "small" }}
            round="small"
          >
            <Heading level={3} margin={{ vertical: "small" }}>
              {org.name}
            </Heading>
            <Text>
              Projects{" "}
              <CreateProject
                orgId={org.id}
                onCreate={projectSlug =>
                  history.push(`/${orgSlug}/${projectSlug}`)
                }
              />
            </Text>
            <ul>
              {org.projects.map(p => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </Box>
        );
      })}
    </Box>
  );
});

const MyProfile = graphql(() => {
  const me = Me();
  return (
    <Box>
      {me.id}
      {me.name}
    </Box>
  );
});

export default HomeScreen;
