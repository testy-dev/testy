import React from "react";

import { Add } from "grommet-icons";
import { Box, Button, Heading } from "grommet";
import { gql, useQuery } from "@apollo/client";

import Logo from "../Logo";

const HomeScreen: React.FC = () => {
  const { data } = useQuery(gql`
    query {
      organization {
        id
        name
      }
    }
  `);
  console.log(data);
  return (
    <Box direction="row" fill>
      {/* Screenshot */}
      <Box flex="grow" pad="medium">
        <Logo />
        <Box direction="row" align="center">
          <Heading level={2}>Organizations</Heading>
          <Button icon={<Add color="status-ok" />} />
        </Box>
        <Box direction="row-responsive">
          <Organization>
            {/*<Add size="large" />*/}
            <Heading level={3} margin="small">
              Horni dolni
            </Heading>
          </Organization>
        </Box>
      </Box>

      {/* User */}
      <Box basis="350px" background="light-3" flex={false} align="center">
        <Heading level={2}>Me</Heading>
      </Box>
    </Box>
  );
};

const Organization: React.FC = ({ children }) => (
  <Box
    background="light-3"
    pad="small"
    margin={{ right: "small", bottom: "small" }}
    round="small"
  >
    {children}
  </Box>
);

export default HomeScreen;
