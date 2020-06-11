import "firebase/auth";
import * as firebase from "firebase/app";
import { useEffect, useState } from "react";

const waitForNewToken = async (user: firebase.User) => {
  // Check if refresh is required.
  const metadataRef = firebase
    .database()
    .ref("metadata/" + user.uid + "/refreshTime");
  await new Promise(resolve => {
    const handleUpdate = (data: firebase.database.DataSnapshot) => {
      if (!data.exists) return;
      metadataRef.off("value", handleUpdate);
      resolve(data);
    };
    metadataRef.on("value", handleUpdate);
  });
  await user.getIdToken(true);
};

export function useFirebaseAuthState() {
  const [authState, setAuthState] = useState<"loading" | "in" | "out">(
    "loading"
  );

  useEffect(() =>
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (!hasuraClaim) {
          await waitForNewToken(user);
        }
        // await createGqlUser(user.uid, user.displayName ?? "");
        setAuthState("in");
      } else {
        setAuthState("out");
      }
    })
  );

  return authState;
}
