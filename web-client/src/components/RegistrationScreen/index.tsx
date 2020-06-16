import * as React from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
} from "grommet";
import { Github, Google } from "grommet-icons";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";

const RegistrationScreen: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const handleRegistration = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box direction="column" align="center" gap="medium">
      <Box justify="center">
        <Heading level={1}>Registration</Heading>
      </Box>
      <Box width="medium">
        <Form onSubmit={handleRegistration} aria-label="Registration">
          <FormField label="E-mail">
            <TextInput
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormField>
          <FormField label="Password">
            <TextInput
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormField>
          {error && (
            <Box margin={{ vertical: "medium" }}>
              <Text color="status-error">{error}</Text>
            </Box>
          )}
          <Button
            type="submit"
            label="Register"
            size="large"
            primary={true}
            fill="horizontal"
          />
        </Form>
      </Box>
      <Box direction="column" gap="medium">
        <Box direction="row" gap="medium">
          <Google color="plain" size="large" />
          <Github color="plain" size="large" />
        </Box>
        <Button
          label="Login"
          fill="horizontal"
          onClick={() => history.push("login")}
        />
      </Box>
    </Box>
  );
};

export default RegistrationScreen;
