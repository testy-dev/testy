import * as React from "react";

import * as firebase from "firebase/app";
import { Box, Button, Form, FormField, Text, TextInput } from "grommet";
import { Github, Google } from "grommet-icons";

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = React.useCallback(async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
      console.warn(e);
    }
  }, [email, password]);

  const handleGoogle = React.useCallback(async () => {
    try {
      await firebase.auth().signInWithPopup(new GoogleAuthProvider());
    } catch (e) {
      setError(e.message);
      console.warn(e);
    }
  }, [setError]);

  return (
    <Box direction="column" align="center" gap="xsmall" pad="medium">
      <Box>
        <Form onSubmit={handleLogin} aria-label="Login">
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
            label="Login"
            size="small"
            primary={true}
            fill="horizontal"
          />
        </Form>
      </Box>
      <Box direction="row" gap="medium">
        <Google
          onClick={handleGoogle}
          role="button"
          aria-label="Login with Google account"
          color="plain"
        />
        <Github color="plain" />
      </Box>
    </Box>
  );
};

export default Login;
