import React from "react";

import { Button, Heading } from "grommet";
import firebase from "firebase/app";

const Logo: React.FC = () => (
  <Heading color="#0B74C2" level={2} margin="none">
    Testy
    <Button
      primary
      label="Log Out"
      onClick={async () => firebase.auth().signOut()}
    />
  </Heading>
);

export default Logo;
