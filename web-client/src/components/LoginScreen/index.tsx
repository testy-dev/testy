import React from "react";

import {Box, Heading, Form, FormField, TextInput, Button} from "grommet";
import {Google, Github} from "grommet-icons";

const LoginScreen: React.FC = () => {
  return (
    <Box direction="column" align="center" gap="medium">
      <Box justify="center">
        <Heading level={1}>Login</Heading>
      </Box>
      <Box>
        <Form>
          <FormField label="E-mail">
            <TextInput type="email" />
          </FormField>
          <FormField label="Password">
            <TextInput type="password" />
          </FormField>
          <Button label="Login" primary={true} fill="horizontal"/>
        </Form>
      </Box>
      <Box direction="row" gap="medium">
        <Google color="plain" size="large" />
        <Github color="plain" size="large" />
      </Box>
    </Box>
  );
};

export default LoginScreen;