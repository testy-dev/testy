import React, { Suspense } from "react";

import { Add } from "grommet-icons";
import { Box, Button, Heading } from "grommet";
import { graphql } from "@gqless/react";

import { query } from "../../graphql";
import Logo from "../Logo";

const HomeScreen: React.FC = () => (
  <Box direction="row" fill>
    {/* Screenshot */}
    <Box flex="grow" pad="medium">
      <Logo />
      <Box direction="row" align="center">
        <Heading level={2}>Organizations</Heading>
        <Button icon={<Add color="status-ok" />} />
      </Box>
      <Suspense fallback="Loading ...">
        <Organizations />
      </Suspense>
    </Box>

    {/* User */}
    <Box basis="350px" background="light-3" flex={false} align="center">
      <Heading level={2}>Me</Heading>
    </Box>
  </Box>
);

const Organizations = graphql(() => (
  <Box direction="row-responsive">
    {query.organization.map(org => (
      <Box
        key={org.id}
        background="light-3"
        pad="small"
        margin={{ right: "small", bottom: "small" }}
        round="small"
      >
        <Heading level={3} margin="small">
          {org.name}
        </Heading>
      </Box>
    ))}
  </Box>
));

export default HomeScreen;
