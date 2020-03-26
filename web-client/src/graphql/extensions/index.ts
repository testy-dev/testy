import firebase from "firebase/app";

import { query } from "../client";

export const Query = {};

/**
 * Add a key to a type
 */
// export const User = {
//   [GET_KEY]: (user) => user.id
// }

/**
 * Add custom data to a type
 * @example
 * query.users[0].follow()
 */
// export const User = (user) => ({
//   follow() {
//     console.log('follow', user.id)
//   }
// })

export const Me = () => {
  const user = firebase.auth().currentUser;
  if (!user) return null;
  return query.user({
    where: {
      // @ts-ignore
      firebase_id: {
        _eq: user.uid,
      },
    },
  })[0];
};
